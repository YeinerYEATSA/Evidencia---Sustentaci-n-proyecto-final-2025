import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(form.email, form.password);
    window.location.href = '/dashboard';
  };

  return (
    <div className="max-w-sm mx-auto p-6">
      {/* Logo y título */}
      <div className="flex flex-col items-center mb-6">
        <img src="/logo.png" alt="YENIJO Logo" className="h-16 w-16 mb-2" />
        <h1 className="text-xl font-bold text-blue-600">YENIJO Telecomunicaciones</h1>
      </div>

      <h2 className="text-2xl font-bold mb-4">Ingresar</h2>
      
      <form onSubmit={onSubmit} className="space-y-3">
        <input 
          className="w-full border p-2" 
          placeholder="Email" 
          onChange={e => setForm({ ...form, email: e.target.value })} 
        />
        <input 
          type="password" 
          className="w-full border p-2" 
          placeholder="Contraseña" 
          onChange={e => setForm({ ...form, password: e.target.value })} 
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Entrar
        </button>
      </form>
    </div>
  );
}
