import { pool } from '../config/db.js';

export const listarUsuarios = async (req, res) => {
  const [rows] = await pool.query('SELECT ID_Usuario, Correo, Tipo_Usuario FROM Usuario');
  res.json(rows);
};

export const cambiarRolUsuario = async (req, res) => {
  const { id } = req.params;
  const { nuevoRol } = req.body;

  if (!['admin', 'Piloto', 'Aspirante'].includes(nuevoRol)) {
    return res.status(400).json({ message: 'Rol inválido' });
  }

  await pool.query('UPDATE Usuario SET Tipo_Usuario = ? WHERE ID_Usuario = ?', [nuevoRol, id]);
  res.json({ message: 'Rol actualizado con éxito' });
};
