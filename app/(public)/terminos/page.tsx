import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: 'Términos y condiciones de uso de Borboleta Salón de Eventos.',
}

export default function TerminosPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-serif text-4xl font-semibold mb-6">Términos y Condiciones</h1>
        <p className="text-muted-foreground mb-8">Última actualización: enero 2025</p>
        
        <div className="space-y-6">
          <section>
            <h2 className="font-serif text-2xl font-semibold mb-3">1. Aceptación de los términos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Al utilizar este sitio web o contratar nuestros servicios, usted acepta estos Términos y Condiciones 
              en su totalidad. Si no está de acuerdo, no utilice nuestro sitio o servicios.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl font-semibold mb-3">2. Servicios</h2>
            <p className="text-muted-foreground leading-relaxed">
              Borboleta ofrece servicios de alquiler de salón y organización de eventos. Los precios mostrados 
              son referenciales; el precio final se determina en el contrato formal firmado entre las partes.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl font-semibold mb-3">3. Reservas y pagos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Las reservas se confirman con un anticipo del 30% del monto total. Este anticipo no es reembolsable 
              en caso de cancelación con menos de 30 días de anticipación.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl font-semibold mb-3">4. Responsabilidades</h2>
            <p className="text-muted-foreground leading-relaxed">
              El cliente es responsable del comportamiento de sus invitados y de cualquier daño causado al 
              inmueble o equipos. Borboleta no se responsabiliza por objetos personales olvidados en el salón.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl font-semibold mb-3">5. Propiedad intelectual</h2>
            <p className="text-muted-foreground leading-relaxed">
              Todo el contenido de este sitio (textos, imágenes, logotipos) es propiedad de Borboleta y está 
              protegido por derechos de autor. Prohibida su reproducción sin autorización escrita.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl font-semibold mb-3">6. Ley aplicable</h2>
            <p className="text-muted-foreground leading-relaxed">
              Estos términos se rigen por las leyes del Estado Plurinacional de Bolivia. Cualquier disputa 
              será resuelta en los tribunales de la ciudad de Sucre, Chuquisaca.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
