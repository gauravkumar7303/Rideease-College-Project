import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  profileImage: String,
  licenseNumber: { type: String, required: true, unique: true },
  licenseExpiry: Date,
  licenseImage: String,
  experience: { type: Number, default: 0 },
  vehicleTypes: [{ type: String, enum: ['car', 'bike', 'auto'] }],
  languages: [{ type: String }],
  isAvailable: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  status: { type: String, enum: ['pending', 'active', 'suspended'], default: 'pending' },
  rating: { type: Number, default: 5 },
  totalTrips: { type: Number, default: 0 },
  totalEarnings: { type: Number, default: 0 },
  currentBookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Driver || mongoose.model('Driver', driverSchema);