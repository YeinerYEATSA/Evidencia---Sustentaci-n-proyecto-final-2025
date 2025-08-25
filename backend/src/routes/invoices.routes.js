import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { listInvoices, createInvoice, updateInvoice, deleteInvoice, payInvoice, invoicePDF, exportAllPDF } from '../controllers/invoices.controller.js';

const router = Router();
router.get('/', requireAuth, listInvoices);
router.post('/', requireAuth, createInvoice);
router.put('/:id', requireAuth, updateInvoice);
router.delete('/:id', requireAuth, deleteInvoice);
router.post('/:id/pay', requireAuth, payInvoice);
router.get('/:id/pdf', requireAuth, invoicePDF);
router.get('/export/all', requireAuth, exportAllPDF);
export default router;
