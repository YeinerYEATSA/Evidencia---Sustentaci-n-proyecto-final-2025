import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  number: { type: String, required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  items: [{ description: String, qty: Number, price: Number }],
  total: { type: Number, required: true },
  status: { type: String, enum: ['PENDIENTE', 'PAGADA', 'ANULADA'], default: 'PENDIENTE' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Invoice', invoiceSchema);
