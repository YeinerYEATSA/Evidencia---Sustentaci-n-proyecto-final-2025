import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      {/* Logo + Nombre */}
      <Link to="/" className="flex items-center space-x-2">
        <img src="/logo.png" alt="YENIJO Logo" className="h-8 w-8" />
        <span className="font-bold">YENIJO Telecomunicaciones</span>
      </Link>

      {/* Links de navegación */}
      <div className="space-x-4 flex items-center">
        {user ? (
          <>
            <Link to="/dashboard">Panel</Link>
            <Link to="/clients">Clientes</Link>
            <Link to="/invoices">Facturas</Link>
            {user.role === 'ADMIN' && <Link to="/admin">Admin</Link>}
            <button
              onClick={logout}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 transition"
            >
              Salir
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Ingresar</Link>
            <Link to="/register">Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
}
