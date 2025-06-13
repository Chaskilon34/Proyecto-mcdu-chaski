import bcrypt from 'bcrypt';
import { buscarUsuarioPorCorreo, obtenerRolPorId } from '../models/userModel.js';

export const login = async (req, res) => {
  const { correo, contraseña } = req.body;

  const user = await buscarUsuarioPorCorreo(correo);

  if (!user) {
    return res.status(400).json({ message: 'Usuario no encontrado' });
  }

  const esValido = await bcrypt.compare(contraseña, user.contraseña);
  if (!esValido) {
    return res.status(401).json({ message: 'Contraseña incorrecta' });
  }

  const rol = await obtenerRolPorId(user.id_rol);

  res.status(200).json({ message: 'Login exitoso', rol });
};
