
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Importa todas las rutas necesarias
import authRoutes from './routes/authRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import adminRoutes from './routes/adminRoutes.js'; // ✅ NUEVA IMPORTACIÓN PARA ADMIN

const app = express();

// Configuración de middlewares
app.use(cors());          // Permite solicitudes de otros dominios
app.use(express.json());  // Parsea el cuerpo de las solicitudes como JSON

// Configuración de rutas de archivos estáticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../frontend'))); // Sirve el frontend

// ========== REGISTRO DE RUTAS ==========
app.use('/api', authRoutes);          // Rutas de autenticación (login, registro)
app.use('/api/usuarios', usuarioRoutes); // Rutas de usuario (si existen)
app.use('/api/admin', adminRoutes);    // ✅ NUEVAS RUTAS DE ADMINISTRACIÓN

// Redirigir raíz al login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/pages/login.html'));
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
