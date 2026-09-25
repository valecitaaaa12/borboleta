import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'Borboleta <noreply@borboleta.bo>',
      to,
      subject,
      html,
      text,
    })
    return { success: true }
  } catch (error) {
    console.error('Error enviando email:', error)
    return { success: false, error }
  }
}

export function cotizacionEmailTemplate(data: {
  nombre: string
  tipoEvento: string
  numInvitados: number
  presupuesto: number
  fecha?: string
}) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="UTF-8"><title>Cotización Borboleta</title></head>
    <body style="font-family: Arial, sans-serif; background: #f9f4ff; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(147,51,234,0.1);">
        <div style="background: linear-gradient(135deg, #9333ea, #d4a017); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🦋 Borboleta</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0;">Salón de Eventos — Sucre, Bolivia</p>
        </div>
        <div style="padding: 30px;">
          <h2 style="color: #6b1abd;">¡Cotización Recibida!</h2>
          <p>Estimado/a <strong>${data.nombre}</strong>,</p>
          <p>Hemos recibido su solicitud de cotización. Aquí está el resumen:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background: #f5f0ff;">
              <td style="padding: 10px; border: 1px solid #e0d0ff;"><strong>Tipo de Evento</strong></td>
              <td style="padding: 10px; border: 1px solid #e0d0ff;">${data.tipoEvento}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e0d0ff;"><strong>Número de Invitados</strong></td>
              <td style="padding: 10px; border: 1px solid #e0d0ff;">${data.numInvitados} personas</td>
            </tr>
            ${data.fecha ? `<tr style="background: #f5f0ff;"><td style="padding: 10px; border: 1px solid #e0d0ff;"><strong>Fecha del Evento</strong></td><td style="padding: 10px; border: 1px solid #e0d0ff;">${data.fecha}</td></tr>` : ''}
            <tr ${!data.fecha ? 'style="background: #f5f0ff;"' : ''}>
              <td style="padding: 10px; border: 1px solid #e0d0ff;"><strong>Presupuesto Estimado</strong></td>
              <td style="padding: 10px; border: 1px solid #e0d0ff; color: #9333ea; font-weight: bold;">Bs. ${data.presupuesto.toLocaleString('es-BO', { minimumFractionDigits: 2 })}</td>
            </tr>
          </table>
          <p>Nos pondremos en contacto contigo en las próximas 24 horas para confirmar los detalles.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://wa.me/59175791516" style="background: #25d366; color: white; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold;">💬 Chatear por WhatsApp</a>
          </div>
        </div>
        <div style="background: #f5f0ff; padding: 20px; text-align: center; color: #6b1abd; font-size: 14px;">
          <p>Borboleta Salón de Eventos | Sucre, Bolivia</p>
          <p>📞 +591 75791516 | 📍 Sucre, Chuquisaca</p>
        </div>
      </div>
    </body>
    </html>
  `
}
