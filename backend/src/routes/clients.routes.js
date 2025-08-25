import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { listClients, createClient, updateClient, deleteClient } from '../controllers/clients.controller.js';

const router = Router();
router.get('/', requireAuth, listClients);
router.post('/', requireAuth, createClient);
router.put('/:id', requireAuth, updateClient);
router.delete('/:id', requireAuth, deleteClient);
export default router;
