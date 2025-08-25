import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function ClientsPage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name: '', address: '', phone: '' });

  const load = async () => setList((await api.get('/clients')).data);
  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    await api.post('/clients', form);
    setForm({ name: '', address: '', phone: '' });
    load();
  };

  const remove = async (id) => { await api.delete(`/clients/${id}`); load(); };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Clientes</h2>
      <form onSubmit={save} className="flex gap-2 mb-4">
        <input className="border p-2" placeholder="Nombre" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input className="border p-2" placeholder="Dirección" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} />
        <input className="border p-2" placeholder="Teléfono" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
        <button className="bg-green-600 text-white px-4 rounded">Guardar</button>
      </form>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Dirección</th>
            <th className="p-2 text-left">Teléfono</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {list.map(c => (
            <tr key={c._id} className="border-t">
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.address}</td>
              <td className="p-2">{c.phone}</td>
              <td className="p-2 text-center">
                <button onClick={() => remove(c._id)} className="bg-red-600 text-white px-3 py-1 rounded">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
