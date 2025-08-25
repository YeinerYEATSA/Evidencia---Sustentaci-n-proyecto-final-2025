export const requireRole = (role) => (req, res, next) => {
  if (!req.userRole) return res.status(403).json({ message: 'Rol no encontrado' });
  if (req.userRole !== role) return res.status(403).json({ message: 'Acceso restringido' });
  next();
};
