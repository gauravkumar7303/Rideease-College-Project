import mongoose from './mongoose';

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['booking', 'payment', 'driver', 'system', 'promotion'], 
    required: true 
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  relatedBooking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  actionUrl: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema);