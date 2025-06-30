import express from 'express';
import { listarUsuarios, cambiarRolUsuario } from '../controllers/userAdminController.js';
import { verificarAdmin } from '../middleware/verificarAdmin.js';

const router = express.Router();

router.get('/', verificarAdmin, listarUsuarios);
router.put('/rol/:id', verificarAdmin, cambiarRolUsuario);

export default router;
