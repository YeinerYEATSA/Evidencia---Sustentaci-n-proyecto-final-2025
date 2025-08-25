import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/User.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({ jsonTransport: true }); // test: logs message object

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'El correo ya está registrado' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role: role || 'CLIENT' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name, email, role: user.role } });
  } catch (e) {
    res.status(500).json({ message: 'Error en registro' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Credenciales inválidas' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch {
    res.status(500).json({ message: 'Error en login' });
  }
};

export const profile = async (req, res) => {
  const user = await User.findById(req.userId).select('-password -resetToken -resetExpires');
  res.json(user);
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });
  const token = uuidv4();
  user.resetToken = token;
  user.resetExpires = Date.now() + 1000 * 60 * 60; // 1 hour
  await user.save();
  const resetLink = `http://localhost:5173/reset-password/${token}`;
  // send email (test transport): logs object
  const info = await transporter.sendMail({
    from: 'no-reply@yenijo.com',
    to: user.email,
    subject: 'Recuperar contraseña - YENIJO Telecomunicaciones',
    text: `Use este enlace para restablecer su contraseña (prueba): ${resetLink}`
  });
  console.log('Simulated email send:', info);
  res.json({ message: 'Se generó el enlace de recuperación (ver consola en modo prueba)' });
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const user = await User.findOne({ resetToken: token, resetExpires: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ message: 'Token inválido o expirado' });
  user.password = await bcrypt.hash(password, 10);
  user.resetToken = undefined;
  user.resetExpires = undefined;
  await user.save();
  res.json({ message: 'Contraseña restablecida correctamente' });
};
