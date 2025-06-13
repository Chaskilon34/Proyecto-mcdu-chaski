import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas API
app.use('/api', authRoutes);

// Ruta raíz por defecto
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

app.listen(3000, () => {
  console.log('🚀 Servidor corriendo en http://localhost:3000');
});
