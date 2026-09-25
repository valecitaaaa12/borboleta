import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de Borboleta Salón de Eventos.',
}

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-serif text-4xl font-semibold mb-6">Política de Privacidad</h1>
        <p className="text-muted-foreground mb-8">Última actualización: enero 2025</p>
        
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="font-serif text-2xl font-semibold mb-3">1. Información que recopilamos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Borboleta Salón de Eventos recopila información que usted nos proporciona directamente, como nombre, 
              correo electrónico, teléfono y datos del evento cuando solicita una cotización o crea una cuenta.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl font-semibold mb-3">2. Uso de la información</h2>
            <p className="text-muted-foreground leading-relaxed">
              Utilizamos su información para: procesar cotizaciones y reservas, comunicarnos sobre su evento, 
              enviar confirmaciones y recordatorios, mejorar nuestros servicios y cumplir obligaciones legales.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl font-semibold mb-3">3. Compartir información</h2>
            <p className="text-muted-foreground leading-relaxed">
              No vendemos, alquilamos ni compartimos su información personal con terceros sin su consentimiento, 
              excepto cuando sea necesario para prestar el servicio (proveedores de catering, DJ, etc.) o por 
              obligación legal.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl font-semibold mb-3">4. Seguridad</h2>
            <p className="text-muted-foreground leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas para proteger su información contra 
              acceso no autorizado, alteración, divulgación o destrucción.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl font-semibold mb-3">5. Sus derechos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales. 
              Para ejercer estos derechos, contáctenos en info@borboleta.bo.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl font-semibold mb-3">6. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Utilizamos cookies para mejorar su experiencia en nuestro sitio. Puede configurar su navegador 
              para rechazar cookies, aunque esto puede afectar algunas funcionalidades.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl font-semibold mb-3">7. Contacto</h2>
            <p className="text-muted-foreground leading-relaxed">
              Para consultas sobre privacidad: <a href="mailto:info@borboleta.bo" className="text-primary underline">info@borboleta.bo</a> | 
              Teléfono: +591 75791516 | Sucre, Chuquisaca, Bolivia.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
