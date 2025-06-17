export const verificarAdmin = (req, res, next) => {
    const tipo = req.headers['tipo'];
  
    if (tipo !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado: solo administradores' });
    }
  
    next();
  };
  