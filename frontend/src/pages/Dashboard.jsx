import { useAuth } from '../context/AuthContext';
export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Panel</h2>
      <p className="mt-2">Hola {user?.name || 'usuario'}, aquí podrás administrar tu operación.</p>
    </div>
  );
}
