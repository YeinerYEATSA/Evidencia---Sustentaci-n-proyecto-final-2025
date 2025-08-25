import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'CLIENT' });

  const onSubmit = async (e) => {
    e.preventDefault();
    await register(form.name, form.email, form.password, form.role);
    window.location.href = '/dashboard';
  };

  return (
    <div className="max-w-sm mx-auto p-6">
      {/* Logo y título */}
      <div className="flex flex-col items-center mb-6">
        <img src="/logo.png" alt="YENIJO Logo" className="h-16 w-16 mb-2" />
        <h1 className="text-xl font-bold text-blue-600">YENIJO Telecomunicaciones</h1>
      </div>

      <h2 className="text-2xl font-bold mb-4">Crear cuenta</h2>
      
      <form onSubmit={onSubmit} className="space-y-3">
        <input 
          className="w-full border p-2" 
          placeholder="Nombre" 
          onChange={e => setForm({ ...form, name: e.target.value })} 
        />
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
        <select 
          className="w-full border p-2" 
          onChange={e => setForm({ ...form, role: e.target.value })} 
          value={form.role}
        >
          <option value="CLIENT">Cliente</option>
          <option value="ADMIN">Administrador</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Registrarme
        </button>
      </form>
    </div>
  );
}
