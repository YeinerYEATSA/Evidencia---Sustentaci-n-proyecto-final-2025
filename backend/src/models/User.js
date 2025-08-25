import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['ADMIN','CLIENT'], default: 'CLIENT' },
  resetToken: { type: String },
  resetExpires: { type: Date }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
