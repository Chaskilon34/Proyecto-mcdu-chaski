
import bcrypt from 'bcrypt';
import { buscarUsuarioPorCorreo, crearUsuario } from '../models/userModel.js';
import { enviarCorreoRegistro } from '../utils/emailermensaje.js'; // ✅ Importa envío de correo

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
      nombre: user.Nombre_Usuario,
      correo: user.Correo // ✅ Agrega esta línea
    
    });
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ message: 'Error del servidor al iniciar sesión' });
  }
};

export const register = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;
    const tipo = 'Aspirante'; // ✅ Se fuerza el tipo desde el backend

    const existente = await buscarUsuarioPorCorreo(correo);
    if (existente) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const hash = await bcrypt.hash(contraseña, 10);
    await crearUsuario(nombre, correo, hash, tipo);

    // ✅ Enviar correo de bienvenida
    await enviarCorreoRegistro(correo, nombre);

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('❌ Error en registro:', error);
    res.status(500).json({ message: 'Error del servidor al registrar' });
  }
};
