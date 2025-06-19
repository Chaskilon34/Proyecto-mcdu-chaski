import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const enviarCorreoRegistro = async (correoDestino, nombre) => {
  await transporter.sendMail({
    from: `"MCDU CHASKI" <${process.env.EMAIL_USER}>`,
    to: correoDestino,
    subject: '🎉 Registro Exitoso',
    html: `
      <h2>¡Bienvenido/a, ${nombre}!</h2>
      <p>Gracias por registrarte en la Beta del Emulador MCDU .</p>
      <p>Tu cuenta ha sido creada como <strong>Aspirante</strong>.</p>
      <br>
      <small>Este es un mensaje automático. No respondas este correo :3.</small>
    `,
  });
};
