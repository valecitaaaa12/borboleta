# 🦋 Borboleta — Salón de Eventos

**Sitio web completo para Borboleta, el salón de eventos más elegante de Sucre, Bolivia.**

![Borboleta](./1.webp)

## ✨ Características

- 🦋 **Cotizador interactivo** multi-paso con cálculo en tiempo real en Bolivianos
- 📅 **Calendario de disponibilidad** en tiempo real
- 🗺️ **Mapa interactivo** OpenStreetMap/Leaflet con ubicación en Sucre
- 🎨 **Diseñador de planos** drag & drop
- 📸 **Galería filtrable** por tipo de evento
- 🍽️ **Menús dinámicos** con modal de ingredientes y alérgenos
- 💬 **Testimonios** con carrusel y video
- 🌙 **Modo oscuro/claro** persistente
- 📱 **100% responsivo** (mobile-first)
- 🔐 **Panel de administración** completo (roles: admin, coordinador)
- 👤 **Portal del cliente** (progreso de pagos, playlist, contrato digital)
- 📧 **Notificaciones por email** automáticas
- 🤖 **SEO técnico** optimizado (meta tags, sitemap, structured data)
- ♿ **Accesibilidad** (contraste, navegación por teclado, widget de accesibilidad)
- 🌍 **i18n ready** (Español/Inglés)
- 📊 **Dashboard con gráficos** (recharts)
- 🛒 **Paquetes predefinidos** (Económico, Estándar, Premium)
- ⏱️ **Contador regresivo de temporada** en cotizador
- 🎯 **Exit-intent popup** con oferta especial
- 🦋 **Animaciones de mariposas** temáticas (Framer Motion)

## 🚀 Stack Tecnológico

| Tecnología | Uso |
|---|---|
| Next.js 14 (App Router) | Framework principal |
| TypeScript | Tipado estático |
| Tailwind CSS | Estilos |
| Framer Motion | Animaciones |
| Prisma | ORM |
| PostgreSQL | Base de datos |
| NextAuth.js | Autenticación |
| React Hook Form + Zod | Formularios |
| Zustand | Estado global |
| Leaflet + OpenStreetMap | Mapas |
| Recharts | Gráficos |
| @dnd-kit | Drag & drop |
| Nodemailer | Emails |

## 📦 Instalación

### Prerrequisitos

- Node.js 18+
- PostgreSQL (local o servicio en nube: Railway, Supabase, Neon)
- npm o yarn

### 1. Clonar el repositorio

```bash
git clone https://github.com/valecitaaaa12/borboleta.git
cd borboleta
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales reales:

```env
DATABASE_URL="postgresql://usuario:contrasena@host:5432/borboleta_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secreto-aleatorio-seguro"
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="tu@gmail.com"
EMAIL_SERVER_PASSWORD="tu-app-password"
```

### 4. Configurar la base de datos

```bash
# Generar el cliente Prisma
npm run db:generate

# Aplicar el schema a la base de datos
npm run db:push

# (Opcional) Cargar datos de ejemplo
npm run db:seed
```

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🔐 Credenciales de prueba

Después de ejecutar el seed:

| Rol | Email | Contraseña |
|---|---|---|
| Admin | admin@borboleta.bo | Admin123! |
| Cliente | cliente@borboleta.bo | Cliente123! |

## 🌐 Despliegue

### Vercel (recomendado)

1. Conecta tu repositorio en [vercel.com](https://vercel.com)
2. Configura las variables de entorno en el panel de Vercel
3. Usa una base de datos PostgreSQL en la nube:
   - [Neon](https://neon.tech) (gratis)
   - [Railway](https://railway.app)
   - [Supabase](https://supabase.com)

### Variables de entorno requeridas en producción

```
DATABASE_URL
NEXTAUTH_URL (URL de producción)
NEXTAUTH_SECRET
EMAIL_SERVER_HOST
EMAIL_SERVER_PORT
EMAIL_SERVER_USER
EMAIL_SERVER_PASSWORD
EMAIL_FROM
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_WHATSAPP_NUMBER
```

## 📁 Estructura del proyecto

```
borboleta/
├── app/
│   ├── (public)/          # Páginas públicas
│   │   ├── page.tsx       # Página de inicio
│   │   ├── cotizador/     # Cotizador interactivo
│   │   ├── galeria/       # Galería de eventos
│   │   ├── menus/         # Menús y banquetes
│   │   ├── sobre-nosotros/
│   │   ├── contacto/
│   │   ├── blog/
│   │   ├── faq/
│   │   ├── planos/        # Diseñador drag & drop
│   │   ├── privacidad/
│   │   └── terminos/
│   ├── admin/             # Panel administrativo
│   │   ├── dashboard/
│   │   ├── cotizaciones/
│   │   ├── calendario/
│   │   └── ...
│   ├── portal/            # Portal del cliente
│   │   ├── page.tsx
│   │   ├── playlist/
│   │   └── contrato/
│   └── api/               # Rutas API
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Navbar, Footer
│   ├── home/              # Secciones de la home
│   ├── cotizador/         # Wizard de cotización
│   ├── galeria/
│   ├── menus/
│   ├── admin/
│   ├── portal/
│   └── animations/        # Mariposas y efectos
├── lib/
│   ├── prisma/            # Cliente Prisma
│   ├── auth.ts            # NextAuth config
│   ├── utils.ts           # Utilidades
│   └── cotizador-store.ts # Estado Zustand
├── prisma/
│   ├── schema.prisma      # Schema de BD
│   └── seed.ts            # Datos de ejemplo
├── types/
│   └── next-auth.d.ts     # Tipos de sesión
└── public/
    ├── uploads/           # Archivos subidos
    └── 1.webp             # Logo de Borboleta
```

## 📞 Contacto

- **WhatsApp:** +591 75791516
- **Email:** info@borboleta.bo
- **Ubicación:** Sucre, Chuquisaca, Bolivia

---

Desarrollado con 🦋 para **Borboleta Salón de Eventos** | Sucre, Bolivia
