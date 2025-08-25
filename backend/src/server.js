import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import clientRoutes from './routes/clients.routes.js';
import invoiceRoutes from './routes/invoices.routes.js';

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use('/public', express.static(path.resolve('public')));

app.get('/', (_, res) => res.send('API YENIJO Telecomunicaciones ✅'));
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/invoices', invoiceRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => console.log(`🚀 API lista en puerto ${process.env.PORT || 5000}`));
});
