import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export const sendConfirmationEmail = async (to, confirmationUrl) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Confirmação de Email',
    text: `Por favor, confirme seu e-mail clicando no seguinte link: ${confirmationUrl}`,
    html: `<p>Por favor, confirme seu e-mail clicando no seguinte link:</p><a href="${confirmationUrl}">Confirmar Email</a>`,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Email enviado com sucesso!')
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    throw new Error('Não foi possível enviar o email de confirmação.')
  }
}
