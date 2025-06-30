
import { pool } from '../config/db.js';
import { enviarCorreoEliminacion } from '../utils/emailermensaje.js'; // Importa la nueva función

// Listar usuarios
export const listarUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT ID_Usuario, Correo, Tipo_Usuario, Nombre_Usuario FROM Usuario');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar usuarios' });
  }
};

// Cambiar rol de usuario
export const cambiarRolUsuario = async (req, res) => {
  const { id } = req.params;
  const { nuevoRol } = req.body;

  if (!['admin', 'Piloto', 'Aspirante'].includes(nuevoRol)) {
    return res.status(400).json({ message: 'Rol inválido' });
  }

  try {
    await pool.query('UPDATE Usuario SET Tipo_Usuario = ? WHERE ID_Usuario = ?', [nuevoRol, id]);
    res.json({ message: 'Rol actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar rol' });
  }
};

// NUEVA: Eliminar usuario con notificación por correo
export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Obtener datos del usuario antes de eliminarlo
    const [userData] = await pool.query(
      'SELECT Correo, Nombre_Usuario FROM Usuario WHERE ID_Usuario = ?',
      [id]
    );
    
    if (userData.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    const { Correo, Nombre_Usuario } = userData[0];
    
    // 2. Eliminar usuario
    await pool.query('DELETE FROM Usuario WHERE ID_Usuario = ?', [id]);
    
    // 3. Enviar email de notificación
    await enviarCorreoEliminacion(Correo, Nombre_Usuario);
    
    res.status(200).json({ 
      success: true,
      message: 'Usuario eliminado y notificado'
    });
    
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error interno del servidor'
    });
  }
};
