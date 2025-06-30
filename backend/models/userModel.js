import { pool } from '../config/db.js';

export const buscarUsuarioPorCorreo = async (correo) => {
  const [rows] = await pool.query('SELECT * FROM Usuario WHERE Correo = ?', [correo]);
  return rows[0];
};

export const crearUsuario = async (nombre, correo, contraseña, tipo) => {
  const [res] = await pool.query(
    'INSERT INTO Usuario (Nombre_Usuario, Correo, Contraseña, Tipo_Usuario) VALUES (?, ?, ?, ?)',
    [nombre, correo, contraseña, tipo]
  );
  return res.insertId;
};
