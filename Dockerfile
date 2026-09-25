# =====================================================
# Borboleta – Salón de Eventos | Sucre, Bolivia
# Imagen Docker multi-etapa (Next.js 14 + Node 20 Alpine)
# =====================================================

# ── Etapa 1: dependencias ──────────────────────────
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile

# ── Etapa 2: construcción ──────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Genera el cliente Prisma antes del build
RUN npx prisma generate

# Build de producción de Next.js
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ── Etapa 3: imagen de producción ─────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Usuario no privilegiado (buenas prácticas)
RUN addgroup --system --gid 1001 nodejs
RUN adduser  --system --uid 1001 nextjs

# Copiar archivos estáticos del build
COPY --from=builder /app/public ./public

# Permisos para uploads y carpeta .next/cache
RUN mkdir -p /app/public/uploads /app/.next/cache/images && \
    chown -R nextjs:nodejs /app/public /app/.next

# Copiar artefactos del build de Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copiar cliente Prisma generado
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
