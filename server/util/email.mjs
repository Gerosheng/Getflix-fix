import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'getflix@gmail.com',
    pass: 'your_email_password',
  },
})

export const resetMailOptions = (to, resetLink) => ({
  from: 'getflix@gmail.com',
  to,
  subject: 'Password Reset',
  text: `Click on the following link to reset your password: ${resetLink}`,
})
