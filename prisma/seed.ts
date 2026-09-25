import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de datos...')

  // =====================
  // USUARIOS
  // =====================
  const adminHash = await bcrypt.hash('Admin123!', 12)
  const clienteHash = await bcrypt.hash('Cliente123!', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@borboleta.bo' },
    update: {},
    create: {
      name: 'Administrador Borboleta',
      email: 'admin@borboleta.bo',
      password_hash: adminHash,
      rol: 'ADMIN',
    },
  })

  const cliente = await prisma.user.upsert({
    where: { email: 'cliente@borboleta.bo' },
    update: {},
    create: {
      name: 'María Fernanda Quispe',
      email: 'cliente@borboleta.bo',
      password_hash: clienteHash,
      rol: 'CLIENTE',
    },
  })

  console.log('✅ Usuarios creados')

  // =====================
  // MENÚS
  // =====================
  const menus = await Promise.all([
    prisma.menu.upsert({
      where: { id: 'menu-ejecutivo' },
      update: {},
      create: {
        id: 'menu-ejecutivo',
        nombre: 'Menú Ejecutivo',
        descripcion: 'Ideal para eventos corporativos. Equilibrio perfecto entre calidad y practicidad.',
        precio_por_persona: 85,
        categoria: 'Ejecutivo',
        platillos: {
          create: [
            { nombre: 'Ensalada César', tipo: 'entrada', ingredientes: ['Lechuga', 'Aderezo César', 'Crutones', 'Parmesano'], alergenos: ['Lácteos', 'Gluten'], descripcion: 'Clásica ensalada César' },
            { nombre: 'Pechuga a la plancha', tipo: 'principal', ingredientes: ['Pollo', 'Hierbas', 'Limón'], alergenos: [], descripcion: 'Pechuga jugosa marinada' },
            { nombre: 'Brownie de chocolate', tipo: 'postre', ingredientes: ['Chocolate', 'Harina', 'Huevo'], alergenos: ['Gluten', 'Huevo', 'Lácteos'], descripcion: 'Brownie esponjoso' },
          ],
        },
      },
    }),
    prisma.menu.upsert({
      where: { id: 'menu-clasico' },
      update: {},
      create: {
        id: 'menu-clasico',
        nombre: 'Menú Clásico',
        descripcion: 'El favorito de nuestros clientes. 4 tiempos que conquistan paladares.',
        precio_por_persona: 120,
        categoria: 'Clásico',
        platillos: {
          create: [
            { nombre: 'Crema de zapallo', tipo: 'sopa', ingredientes: ['Zapallo', 'Crema', 'Jengibre'], alergenos: ['Lácteos'], descripcion: 'Suave crema de zapallo' },
            { nombre: 'Carpaccio de res', tipo: 'entrada', ingredientes: ['Lomo', 'Alcaparras', 'Rúcula'], alergenos: ['Lácteos'], descripcion: 'Finas láminas de lomo' },
            { nombre: 'Lomo saltado', tipo: 'principal', ingredientes: ['Lomo', 'Tomate', 'Cebolla', 'Papas'], alergenos: ['Soya'], descripcion: 'Clásico lomo saltado' },
            { nombre: 'Flan de vainilla', tipo: 'postre', ingredientes: ['Leche', 'Huevo', 'Vainilla'], alergenos: ['Lácteos', 'Huevo'], descripcion: 'Flan cremoso' },
          ],
        },
      },
    }),
    prisma.menu.upsert({
      where: { id: 'menu-gourmet' },
      update: {},
      create: {
        id: 'menu-gourmet',
        nombre: 'Menú Gourmet',
        descripcion: 'Una experiencia gastronómica de 5 tiempos con ingredientes premium.',
        precio_por_persona: 180,
        categoria: 'Gourmet',
        platillos: {
          create: [
            { nombre: 'Langostinos al ajillo', tipo: 'entrada', ingredientes: ['Langostinos', 'Ajo', 'Mantequilla'], alergenos: ['Mariscos', 'Lácteos'], descripcion: 'Langostinos salteados' },
            { nombre: 'Filete a la borgoña', tipo: 'principal', ingredientes: ['Filete', 'Vino tinto', 'Champiñones'], alergenos: [], descripcion: 'Tierno filete en salsa' },
            { nombre: 'Tarta de frutos rojos', tipo: 'postre', ingredientes: ['Frutillas', 'Frambuesas', 'Crema pastelera'], alergenos: ['Gluten', 'Lácteos'], descripcion: 'Tarta elegante' },
          ],
        },
      },
    }),
    prisma.menu.upsert({
      where: { id: 'menu-infantil' },
      update: {},
      create: {
        id: 'menu-infantil',
        nombre: 'Menú Infantil',
        descripcion: 'Diseñado especialmente para los más pequeños.',
        precio_por_persona: 65,
        categoria: 'Infantil',
        platillos: {
          create: [
            { nombre: 'Nuggets de pollo', tipo: 'principal', ingredientes: ['Pollo', 'Pan rallado'], alergenos: ['Gluten'], descripcion: 'Crujientes nuggets' },
            { nombre: 'Papas fritas', tipo: 'acompañamiento', ingredientes: ['Papas', 'Sal'], alergenos: [], descripcion: 'Papas doradas' },
            { nombre: 'Helado con toppings', tipo: 'postre', ingredientes: ['Helado', 'Chispas de chocolate'], alergenos: ['Lácteos'], descripcion: 'Helado con sorpresas' },
          ],
        },
      },
    }),
  ])

  console.log('✅ Menús creados')

  // =====================
  // SERVICIOS EXTRA
  // =====================
  const serviciosData = [
    { nombre: 'DJ Profesional', descripcion: '5 horas con equipo de sonido premium', precio: 1500, categoria: 'Música' },
    { nombre: 'Decoración Floral', descripcion: 'Centro de mesas + arreglos principales', precio: 2000, categoria: 'Decoración' },
    { nombre: 'Fotografía y Video', descripcion: 'Cobertura completa del evento', precio: 3500, categoria: 'Fotografía' },
    { nombre: 'Barra de Bebidas', descripcion: 'Barra libre por 4 horas', precio: 1800, categoria: 'Catering' },
    { nombre: 'Cabina de Fotos', descripcion: 'PhotoBooth con accesorios y álbum', precio: 800, categoria: 'Entretenimiento' },
    { nombre: 'Show de Mariposas', descripcion: 'Espectáculo temático Borboleta', precio: 1200, categoria: 'Entretenimiento' },
    { nombre: 'Iluminación LED', descripcion: 'Sistema de luces programables', precio: 1000, categoria: 'Decoración' },
    { nombre: 'Torta Personalizada', descripcion: 'Diseño único para tu evento', precio: 500, categoria: 'Catering' },
  ]

  for (const s of serviciosData) {
    await prisma.servicioExtra.upsert({
      where: { id: `serv-${s.nombre.toLowerCase().replace(/ /g, '-')}` },
      update: {},
      create: { id: `serv-${s.nombre.toLowerCase().replace(/ /g, '-')}`, ...s },
    })
  }

  console.log('✅ Servicios extra creados')

  // =====================
  // FAQ
  // =====================
  const faqsData = [
    { pregunta: '¿Con cuánta anticipación debo reservar?', respuesta: 'Recomendamos reservar con 3-6 meses de anticipación. Solo necesitas un anticipo del 30%.', categoria: 'Reservas', orden: 1 },
    { pregunta: '¿Qué incluye el alquiler del salón?', respuesta: 'Incluye uso exclusivo del salón, estacionamiento, sonido básico, coordinador, mobiliario, vajilla y mantelería.', categoria: 'Servicios', orden: 2 },
    { pregunta: '¿Cuál es la política de cancelación?', respuesta: 'Más de 60 días: 75% del anticipo de vuelta. 30-60 días: 50%. Menos de 30 días: sin reembolso.', categoria: 'Cancelaciones', orden: 3 },
    { pregunta: '¿Hay estacionamiento?', respuesta: 'Sí, para 50 vehículos incluido. Para eventos grandes gestionamos espacios adicionales cercanos.', categoria: 'Logística', orden: 4 },
    { pregunta: '¿Puedo traer proveedores externos?', respuesta: 'Sí, con previo aviso y documentación sanitaria. También contamos con proveedores aliados certificados.', categoria: 'Proveedores', orden: 5 },
    { pregunta: '¿Hasta qué hora puede durar el evento?', respuesta: 'Hasta medianoche incluido. Extensiones por hora con costo adicional, sujeto a disponibilidad.', categoria: 'Horarios', orden: 6 },
    { pregunta: '¿Tienen opciones para dietas especiales?', respuesta: 'Sí, adaptamos menús para vegetarianos, veganos, sin gluten y más. Avisarnos 2 semanas antes.', categoria: 'Gastronomía', orden: 7 },
    { pregunta: '¿Cuál es la capacidad máxima?', respuesta: 'Banquete: 300 | Auditorio: 350 | Cóctel: 400. Con pista de baile se reduce un 15-20%.', categoria: 'Capacidad', orden: 8 },
    { pregunta: '¿Aceptan pagos en cuotas?', respuesta: '30% al reservar, 40% un mes antes, 30% el día del evento. Paquetes premium hasta 6 cuotas.', categoria: 'Pagos', orden: 9 },
  ]

  for (const f of faqsData) {
    await prisma.fAQ.upsert({
      where: { id: `faq-${f.orden}` },
      update: {},
      create: { id: `faq-${f.orden}`, ...f },
    })
  }

  console.log('✅ FAQs creadas')

  // =====================
  // TESTIMONIOS
  // =====================
  const testimoniosData = [
    { nombre_cliente: 'María Fernanda Quispe', texto: 'El equipo de Borboleta hizo nuestra boda perfecta. Cada detalle fue atendido con amor y profesionalismo.', tipo_evento: 'BODA' as const, calificacion: 5 },
    { nombre_cliente: 'Carlos Mamani', texto: 'La quinceañera de mi hija superó todas las expectativas. La decoración fue espectacular y la comida deliciosa.', tipo_evento: 'QUINCEANERA' as const, calificacion: 5 },
    { nombre_cliente: 'Empresa TechBolivia', texto: 'Organizamos nuestro congreso anual en Borboleta. Instalaciones de primer nivel y logística impecable.', tipo_evento: 'CORPORATIVO' as const, calificacion: 5 },
    { nombre_cliente: 'Lucía Torrez', texto: 'El cumpleaños de mi niña fue mágico. Los niños disfrutaron muchísimo y el personal fue muy amable.', tipo_evento: 'INFANTIL' as const, calificacion: 5 },
  ]

  for (let i = 0; i < testimoniosData.length; i++) {
    await prisma.testimonio.upsert({
      where: { id: `test-${i + 1}` },
      update: {},
      create: { id: `test-${i + 1}`, ...testimoniosData[i] },
    })
  }

  console.log('✅ Testimonios creados')

  // =====================
  // GALERÍA (placeholder)
  // =====================
  const tiposEvento = ['BODA', 'QUINCEANERA', 'CORPORATIVO', 'INFANTIL'] as const
  for (let i = 0; i < 12; i++) {
    await prisma.galeriaItem.upsert({
      where: { id: `gal-${i + 1}` },
      update: {},
      create: {
        id: `gal-${i + 1}`,
        url: `https://picsum.photos/seed/borboleta${i + 1}/800/600`,
        tipo_evento: tiposEvento[i % 4],
        descripcion: ['Boda elegante', 'Quinceañera mágica', 'Evento corporativo', 'Fiesta infantil'][i % 4],
        alt: 'Evento en Borboleta Salón de Eventos',
        orden: i,
      },
    })
  }

  console.log('✅ Galería creada')

  // =====================
  // PAQUETES DE EVENTOS
  // =====================
  await Promise.all([
    prisma.paqueteEvento.upsert({
      where: { id: 'pkg-economico' },
      update: {},
      create: {
        id: 'pkg-economico',
        nombre: 'Económico',
        descripcion: 'Ideal para celebraciones íntimas y presupuestos ajustados.',
        precio_base: 5000,
        max_invitados: 100,
        incluye: ['Salón principal 100 personas', 'Decoración básica', 'Menú ejecutivo 3 tiempos', 'Coordinador de eventos', 'Equipo de sonido básico'],
      },
    }),
    prisma.paqueteEvento.upsert({
      where: { id: 'pkg-estandar' },
      update: {},
      create: {
        id: 'pkg-estandar',
        nombre: 'Estándar',
        descripcion: 'El paquete más popular. Todo lo que necesitas para un evento memorable.',
        precio_base: 12000,
        max_invitados: 200,
        destacado: true,
        incluye: ['Salón completo 200 personas', 'Decoración floral', 'Menú premium 4 tiempos', 'DJ 5 horas', 'Barra de bebidas 4h', 'Coordinador VIP', 'Cabina de fotos'],
      },
    }),
    prisma.paqueteEvento.upsert({
      where: { id: 'pkg-premium' },
      update: {},
      create: {
        id: 'pkg-premium',
        nombre: 'Premium',
        descripcion: 'La experiencia más completa y lujosa para tu evento soñado.',
        precio_base: 25000,
        max_invitados: 300,
        incluye: ['Salón completo 300 personas', 'Decoración de lujo personalizada', 'Menú gourmet 5 tiempos', 'DJ + show musical', 'Barra libre', 'Coordinador ejecutivo 24h', 'Foto y video', 'Torta personalizada', 'Transporte VIP'],
      },
    }),
  ])

  console.log('✅ Paquetes de eventos creados')

  // =====================
  // CONFIGURACIÓN DE PRECIOS
  // =====================
  const currentYear = new Date().getFullYear()
  await Promise.all([
    prisma.configuracionPrecios.upsert({
      where: { id: 'temp-alta-1' },
      update: {},
      create: {
        id: 'temp-alta-1',
        temporada: 'alta',
        fecha_inicio: new Date(`${currentYear}-06-01`),
        fecha_fin: new Date(`${currentYear}-08-31`),
        factor_precio: 1.2,
        descripcion: 'Temporada alta de invierno (vacaciones)',
      },
    }),
    prisma.configuracionPrecios.upsert({
      where: { id: 'temp-alta-2' },
      update: {},
      create: {
        id: 'temp-alta-2',
        temporada: 'alta',
        fecha_inicio: new Date(`${currentYear}-11-01`),
        fecha_fin: new Date(`${currentYear + 1}-01-31`),
        factor_precio: 1.25,
        descripcion: 'Temporada alta de fin de año y fiestas',
      },
    }),
  ])

  console.log('✅ Configuración de precios creada')

  // =====================
  // DISPONIBILIDAD CALENDARIO (próximos 3 meses)
  // =====================
  const today = new Date()
  const occupiedDays = [5, 12, 19, 26] // Saturdays
  for (let m = 0; m < 3; m++) {
    for (const day of occupiedDays) {
      const date = new Date(today.getFullYear(), today.getMonth() + m, day)
      if (date >= today) {
        await prisma.disponibilidadCalendario.upsert({
          where: { fecha: date },
          update: {},
          create: {
            fecha: date,
            estado: Math.random() > 0.3 ? 'OCUPADO' : 'PROVISIONAL',
            nota: 'Evento reservado',
          },
        })
      }
    }
  }

  console.log('✅ Disponibilidad de calendario creada')

  // =====================
  // PROVEEDORES ALIADOS
  // =====================
  const aliados = [
    { nombre: 'Fotografía Pro Sucre', categoria: 'Fotografía', contacto: '+591 71234567', enlace: '#' },
    { nombre: 'Dulce Arte Pastelería', categoria: 'Pastelería', contacto: '+591 72345678', enlace: '#' },
    { nombre: 'Flor & Arte', categoria: 'Florería', contacto: '+591 73456789', enlace: '#' },
    { nombre: 'DJ Mix Bolivia', categoria: 'Música', contacto: '+591 74567890', enlace: '#' },
    { nombre: 'Video Moments', categoria: 'Video', contacto: '+591 75678901', enlace: '#' },
    { nombre: 'Transport VIP Sucre', categoria: 'Transporte', contacto: '+591 76789012', enlace: '#' },
  ]

  for (let i = 0; i < aliados.length; i++) {
    await prisma.proveedorAliado.upsert({
      where: { id: `aliado-${i + 1}` },
      update: {},
      create: { id: `aliado-${i + 1}`, ...aliados[i] },
    })
  }

  console.log('✅ Proveedores aliados creados')

  console.log('\n🎉 ¡Seed completado exitosamente!')
  console.log('\n📋 Credenciales de acceso:')
  console.log('Admin: admin@borboleta.bo / Admin123!')
  console.log('Cliente: cliente@borboleta.bo / Cliente123!')
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
