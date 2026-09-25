#!/bin/sh
# =====================================================
# Borboleta – Inicialización de base de datos Docker
# Ejecutar UNA vez después de: docker compose up -d
# =====================================================

echo "🦋 Borboleta – Iniciando base de datos..."

# Esperar que el contenedor web esté healthy
echo "⏳ Esperando que el servicio web esté listo..."
sleep 10

# Ejecutar migraciones de Prisma
docker compose exec web npx prisma db push --skip-generate

# Cargar datos de ejemplo (seed)
docker compose exec web npm run db:seed

echo "✅ Base de datos inicializada correctamente"
echo ""
echo "🔐 Credenciales de prueba:"
echo "   Admin:   admin@borboleta.bo   / Admin123!"
echo "   Cliente: cliente@borboleta.bo / Cliente123!"
echo ""
echo "🌐 Sitio disponible en: http://localhost:3000"
