'use client'

import { useEffect, useState } from 'react'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Loader2 } from 'lucide-react'

interface FAQ {
  id: string
  pregunta: string
  respuesta: string
  categoria: string
}

const FALLBACK_FAQS: FAQ[] = [
  { id: '1', pregunta: '¿Con cuánta anticipación debo reservar el salón?', respuesta: 'Recomendamos reservar con al menos 3 a 6 meses de anticipación, especialmente en temporada alta (junio-agosto y noviembre-enero). Para garantizar tu fecha, solo necesitas un anticipo del 30%.', categoria: 'Reservas' },
  { id: '2', pregunta: '¿Qué incluye el alquiler del salón?', respuesta: 'El alquiler incluye el uso exclusivo del salón principal, estacionamiento, sistema de sonido básico, coordinador de eventos, mobiliario (mesas y sillas), vajilla y mantelería. Los servicios adicionales como catering, DJ y decoración se contratan por separado o en paquetes.', categoria: 'Servicios' },
  { id: '3', pregunta: '¿Cuál es la política de cancelación?', respuesta: 'Las cancelaciones con más de 60 días de anticipación recuperan el 75% del anticipo. Entre 30 y 60 días, el 50%. Menos de 30 días, el anticipo no es reembolsable. En casos de fuerza mayor documentados (COVID, desastres naturales), analizamos caso a caso.', categoria: 'Cancelaciones' },
  { id: '4', pregunta: '¿Hay estacionamiento disponible?', respuesta: 'Sí, contamos con estacionamiento propio para 50 vehículos incluido en el alquiler. Para eventos grandes, gestionamos estacionamiento adicional en espacios cercanos sin costo extra para los invitados.', categoria: 'Logística' },
  { id: '5', pregunta: '¿Puedo traer proveedores externos (DJ, fotógrafo, decorador)?', respuesta: 'Sí, permitimos proveedores externos con previo aviso y presentación de documentación sanitaria y de seguros. También contamos con nuestra lista de proveedores aliados certificados, que garantizan calidad y coordinación fluida.', categoria: 'Proveedores' },
  { id: '6', pregunta: '¿Hasta qué hora puede durar el evento?', respuesta: 'Los eventos pueden extenderse hasta la medianoche (00:00) incluido en el precio estándar. Si necesitas más tiempo, ofrecemos extensiones por hora con costo adicional, sujeto a disponibilidad y ordenanzas municipales.', categoria: 'Horarios' },
  { id: '7', pregunta: '¿Tienen opciones para dietas especiales o alérgenos?', respuesta: 'Absolutamente. Nuestros chefs pueden adaptar los menús para dietas vegetarianas, veganas, sin gluten, sin lácteos y otras restricciones. Es importante informarnos con al menos 2 semanas de anticipación para asegurar la mejor preparación.', categoria: 'Gastronomía' },
  { id: '8', pregunta: '¿Cuál es la capacidad máxima del salón?', respuesta: 'La capacidad varía según el montaje: Banquete (300 personas), Auditorio (350), Cóctel (400). Con pista de baile, las capacidades se reducen un 15-20%. Podemos asesorarte para optimizar el espacio según tus necesidades.', categoria: 'Capacidad' },
  { id: '9', pregunta: '¿Ofrecen paquetes todo incluido?', respuesta: 'Sí, tenemos 3 paquetes: Económico (desde Bs. 5,000), Estándar (desde Bs. 12,000) y Premium (desde Bs. 25,000). Cada uno incluye distintos servicios. También puedes usar nuestro cotizador para un presupuesto 100% personalizado.', categoria: 'Precios' },
  { id: '10', pregunta: '¿Aceptan pagos en cuotas?', respuesta: 'Sí. El esquema estándar es: 30% al reservar, 40% un mes antes del evento, y 30% restante el día del evento. Para paquetes premium ofrecemos planes de hasta 6 cuotas. Aceptamos efectivo, transferencia bancaria y pagos por QR.', categoria: 'Pagos' },
]

const categories = Array.from(new Set(FALLBACK_FAQS.map((f) => f.categoria)))

export function FAQClient() {
  const [faqs, setFaqs] = useState<FAQ[]>(FALLBACK_FAQS)
  const [loading, setLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('Todos')

  useEffect(() => {
    fetch('/api/faqs')
      .then((r) => r.json())
      .then((data) => { if (data && data.length > 0) setFaqs(data) })
      .catch(() => {})
  }, [])

  const cats = ['Todos', ...Array.from(new Set(faqs.map((f) => f.categoria)))]
  const filtered = activeCategory === 'Todos' ? faqs : faqs.filter((f) => f.categoria === activeCategory)

  return (
    <div>
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {cats.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              activeCategory === cat
                ? 'bg-borboleta-purple-600 text-white'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <Accordion type="single" collapsible className="space-y-3">
          {filtered.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="rounded-2xl border px-6 data-[state=open]:bg-borboleta-purple-50 dark:data-[state=open]:bg-borboleta-purple-900/20 transition-colors"
            >
              <AccordionTrigger className="hover:no-underline font-medium text-left">
                <div className="flex items-start gap-3 text-left">
                  <span>{faq.pregunta}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground leading-relaxed">{faq.respuesta}</p>
                <Badge variant="secondary" className="mt-3 text-xs">{faq.categoria}</Badge>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <div className="mt-12 rounded-3xl bg-borboleta-purple-50 dark:bg-borboleta-purple-900/20 p-8 text-center">
        <p className="font-serif text-xl font-semibold mb-2">¿Tienes más preguntas?</p>
        <p className="text-muted-foreground mb-4">Nuestro equipo está listo para ayudarte</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://wa.me/59175791516"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25d366] px-6 py-3 text-white font-medium hover:bg-[#1ebe5d] transition-colors"
          >
            💬 WhatsApp
          </a>
          <a
            href="/contacto"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-borboleta-purple-600 px-6 py-3 text-white font-medium hover:bg-borboleta-purple-700 transition-colors"
          >
            📧 Contactar
          </a>
        </div>
      </div>
    </div>
  )
}
