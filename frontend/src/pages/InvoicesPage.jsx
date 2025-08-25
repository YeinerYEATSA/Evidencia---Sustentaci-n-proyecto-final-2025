import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function InvoicesPage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ number: '', client: '', total: 0 });
  const [clients, setClients] = useState([]);

  const load = async () => {
    setList((await api.get('/invoices')).data);
    setClients((await api.get('/clients')).data);
  };
  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    const body = { ...form, total: Number(form.total) };
    await api.post('/invoices', body);
    setForm({ number: '', client: '', total: 0 });
    load();
  };

  const pay = async (id) => { await api.post(`/invoices/${id}/pay`); load(); };
  const download = (id) => { window.open(`${import.meta.env.VITE_API_URL}/invoices/${id}/pdf`, '_blank'); };
  const downloadAll = () => { window.open(`${import.meta.env.VITE_API_URL}/invoices/export/all`, '_blank'); };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Facturas</h2>

      <form onSubmit={save} className="grid grid-cols-4 gap-2 mb-4 max-w-3xl">
        <input className="border p-2 col-span-1" placeholder="Número" value={form.number} onChange={e=>setForm({...form,number:e.target.value})} />
        <select className="border p-2 col-span-2" value={form.client} onChange={e=>setForm({...form,client:e.target.value})}>
          <option value="">Seleccione cliente</option>
          {clients.map(c => <option key={c._id} value={c._1d}>{c.name}</option>)}
        </select>
        <input type="number" className="border p-2 col-span-1" placeholder="Total" value={form.total} onChange={e=>setForm({...form,total:e.target.value})} />
        <button className="bg-green-600 text-white px-4 py-2 rounded col-span-4">Crear factura</button>
      </form>

      <div className="mb-4">
        <button onClick={downloadAll} className="bg-indigo-600 text-white px-4 py-2 rounded">Descargar todas (PDF)</button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Número</th>
            <th className="p-2 text-left">Cliente</th>
            <th className="p-2 text-left">Total</th>
            <th className="p-2 text-left">Estado</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {list.map(inv => (
            <tr key={inv._id} className="border-t">
              <td className="p-2">{inv.number}</td>
              <td className="p-2">{inv.client?.name}</td>
              <td className="p-2">${'{'}inv.total{'}'}</td>
              <td className="p-2">{inv.status}</td>
              <td className="p-2 flex gap-2">
                {inv.status !== 'PAGADA' && (
                  <button onClick={() => pay(inv._id)} className="bg-blue-600 text-white px-3 py-1 rounded">Pagar (simulado)</button>
                )}
                <button onClick={() => download(inv._id)} className="bg-gray-700 text-white px-3 py-1 rounded">Descargar PDF</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
