import bcrypt from 'bcrypt';
import { buscarUsuarioPorCorreo, crearUsuario } from '../models/userModel.js';

export const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const user = await buscarUsuarioPorCorreo(correo);
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

    const valido = await bcrypt.compare(contraseña, user.Contraseña);
    if (!valido) return res.status(401).json({ message: 'Contraseña incorrecta' });

    res.status(200).json({
      message: 'Login exitoso',
      tipo: user.Tipo_Usuario,
      nombre: user.Nombre_Usuario
    });
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ message: 'Error del servidor al iniciar sesión' });
  }
};

export const register = async (req, res) => {
  try {
    const { nombre, correo, contraseña, tipo } = req.body;

    const existente = await buscarUsuarioPorCorreo(correo);
    if (existente) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const hash = await bcrypt.hash(contraseña, 10);
    await crearUsuario(nombre, correo, hash, tipo);

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('❌ Error en registro:', error);
    res.status(500).json({ message: 'Error del servidor al registrar' });
  }
};
