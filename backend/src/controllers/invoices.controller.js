import Invoice from '../models/Invoice.js';
import Client from '../models/Client.js';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const listInvoices = async (req, res) => {
  const data = await Invoice.find().populate('client');
  res.json(data);
};

export const createInvoice = async (req, res) => {
  const inv = await Invoice.create({ ...req.body, owner: req.userId });
  res.status(201).json(inv);
};

export const updateInvoice = async (req, res) => {
  const inv = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(inv);
};

export const deleteInvoice = async (req, res) => {
  await Invoice.findByIdAndDelete(req.params.id);
  res.json({ message: 'Factura eliminada' });
};

export const payInvoice = async (req, res) => {
  const inv = await Invoice.findByIdAndUpdate(req.params.id, { status: 'PAGADA' }, { new: true });
  res.json({ message: 'Pago exitoso (simulado)', invoice: inv });
};

const logoPath = path.resolve('public/assets/logo.svg');

export const invoicePDF = async (req, res) => {
  const inv = await Invoice.findById(req.params.id).populate('client');
  if (!inv) return res.status(404).json({ message: 'Factura no encontrada' });

  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=invoice_${inv.number}.pdf`);
  // Header with logo and company
  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, 50, 45, { width: 80 });
  }
  doc.fontSize(20).text('YENIJO Telecomunicaciones', 150, 50);
  doc.moveDown();
  doc.fontSize(12).text(`Factura N°: ${inv.number}`);
  doc.text(`Cliente: ${inv.client?.name || ''}`);
  doc.text(`Fecha: ${inv.createdAt.toISOString().split('T')[0]}`);
  doc.moveDown();
  doc.text('Items:');
  inv.items.forEach((it, i) => {
    doc.text(`${i+1}. ${it.description} - ${it.qty} x ${it.price}`);
  });
  doc.moveDown();
  doc.text(`Total: $${inv.total}`);
  doc.moveDown();
  doc.text('¡Gracias por su compra!');
  doc.end();
  doc.pipe(res);
};

export const exportAllPDF = async (req, res) => {
  const invoices = await Invoice.find().populate('client');
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=all_invoices.pdf`);
  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, 50, 45, { width: 80 });
  }
  doc.fontSize(20).text('YENIJO Telecomunicaciones - Reporte de Facturas', 150, 50);
  doc.moveDown(2);
  invoices.forEach((inv, idx) => {
    doc.fontSize(12).text(`Factura N°: ${inv.number}`);
    doc.text(`Cliente: ${inv.client?.name || ''}`);
    doc.text(`Fecha: ${inv.createdAt.toISOString().split('T')[0]}`);
    doc.text(`Total: $${inv.total}`);
    doc.moveDown();
    if (idx < invoices.length - 1) doc.addPage();
  });
  doc.end();
  doc.pipe(res);
};
