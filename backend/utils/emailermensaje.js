
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

// Función para enviar correo de registro
export const enviarCorreoRegistro = async (correoDestino, nombre) => {
  await transporter.sendMail({
    from: `"MCDU CHASKI" <${process.env.EMAIL_USER}>`,
    to: correoDestino,
    subject: '🎉 Registro Exitoso',
    html: `
      <h2>¡Bienvenido/a, ${nombre}!</h2>
      <p>Gracias por registrarte en la Beta del Emulador MCDU.</p>
      <p>Tu cuenta ha sido creada como <strong>Aspirante</strong>.</p>
      <br>
      <small>Este es un mensaje automático. No respondas este correo :3.</small>
    `,
  });
};

// NUEVA: Función para enviar correo de eliminación de cuenta
export const enviarCorreoEliminacion = async (correoDestino, nombre) => {
  await transporter.sendMail({
    from: `"MCDU CHASKI" <${process.env.EMAIL_USER}>`,
    to: correoDestino,
    subject: '⚠️ Tu cuenta ha sido eliminada',
    html: `
      <h2>Hola ${nombre},</h2>
      <p>Lamentamos informarte que tu cuenta en el Emulador MCDU ha sido eliminada por un administrador.</p>
      <p>Si crees que esto es un error, contacta con soporte.</p>
      <br>
      <small>Este es un mensaje automático. No respondas este correo.</small>
    `,
  });
};
