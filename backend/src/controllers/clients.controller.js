import Client from '../models/Client.js';

export const listClients = async (req, res) => {
  const data = await Client.find().sort({ createdAt: -1 });
  res.json(data);
};

export const createClient = async (req, res) => {
  const c = await Client.create({ ...req.body, owner: req.userId });
  res.status(201).json(c);
};

export const updateClient = async (req, res) => {
  const c = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(c);
};

export const deleteClient = async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  res.json({ message: 'Cliente eliminado' });
};
