import express from 'express';
import { 
  listarUsuarios, 
  cambiarRolUsuario, 
  eliminarUsuario 
} from '../controllers/userAdminController.js';
import { verificarAdmin } from '../middleware/verificarAdmin.js';
 // Asegúrate de tener este middleware

const router = express.Router();

// Middleware para verificar permisos de admin
router.use(verificarAdmin);

// Rutas
router.get('/usuarios', listarUsuarios);
router.put('/usuarios/rol/:id', cambiarRolUsuario);
router.delete('/usuarios/:id', eliminarUsuario); // Nueva ruta para eliminar

export default router;
