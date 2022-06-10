import { createTransport } from 'nodemailer'
import { API_URL, SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_USER } from '../../config.js'

export const mailService = async (to, link) => {
  const transporter = createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  })

  transporter.sendMail({
    from: SMTP_USER,
    to,
    subject: `Activation account from ${API_URL}`,
    text: '',
    html: `
    <div>
       <h1>From Activation click from this link</h1>
       <a href="${link}">${link}</a>
    </div>
    `
  }).then(el => el)
}
