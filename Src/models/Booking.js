//Path: Src/models/Booking.js
// Path: Src/models/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  bookingType: { type: String, enum: ['self_drive', 'with_driver'], required: true },
  
  // Driver info
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  driverAssignedAt: Date,
  driverStatus: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  
  // Dates
  pickupDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  actualPickupTime: Date,
  actualReturnTime: Date,
  
  // Locations
  pickupLocation: { type: String, required: true },
  returnLocation: String,
  deliveryAddress: String,
  
  // Delivery person
  deliveryPerson: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deliveryPersonContact: String,
  deliveredAt: Date,
  
  // Pricing
  totalDays: { type: Number, required: true },
  baseAmount: { type: Number, required: true },
  driverCharges: { type: Number, default: 0 },
  deliveryCharges: { type: Number, default: 0 },
  insuranceCharges: { type: Number, default: 200 },
  serviceFee: { type: Number, default: 100 },
  totalAmount: { type: Number, required: true },
  securityDeposit: { type: Number, required: true },
  
  // Payment
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid', 'failed', 'refunded'], 
    default: 'pending' 
  },
  paymentMethod: { type: String, enum: ['upi', 'card', 'netbanking'] },
  paymentId: String,
  paidAt: Date,
  
  // Status
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'rep_pickup', 'rep_delivery', 'ongoing', 'rep_collection', 'rep_return', 'completed', 'cancelled', 'rejected'], 
    default: 'pending' 
  },
  
  // Rep Actions
  repActions: {
    pickupFromOwner: {
      status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
      scheduledTime: Date,
      completedTime: Date,
      repId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      notes: String
    },
    deliverToUser: {
      status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
      scheduledTime: Date,
      completedTime: Date,
      repId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      notes: String
    },
    collectFromUser: {
      status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
      scheduledTime: Date,
      completedTime: Date,
      repId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      notes: String
    },
    returnToOwner: {
      status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
      scheduledTime: Date,
      completedTime: Date,
      repId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      notes: String
    }
  },
  
  // Cancellation
  cancelledBy: { type: String, enum: ['customer', 'driver', 'owner', 'admin'] },
  cancellationReason: String,
  cancellationTime: Date,
  refundAmount: { type: Number, default: 0 },
  
  // Ratings
  customerRating: Number,
  customerReview: String,
  driverRating: Number,
  driverReview: String,
  vehicleRating: Number,
  vehicleReview: String,
  
  // Customer Details
  customerDetails: {
    name: String,
    email: String,
    phone: String,
    licenseNumber: String,
    address: String,
    emergencyContact: String
  }
  
}, { 
  timestamps: true  // ✅ This automatically handles createdAt and updatedAt
});

// ✅ REMOVED the problematic pre-save middleware
// No need for bookingSchema.pre('save', ...) because timestamps: true handles it

// Indexes for better performance
bookingSchema.index({ bookingId: 1 }, { unique: true });
bookingSchema.index({ customer: 1 });
bookingSchema.index({ vehicle: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ pickupDate: 1 });
bookingSchema.index({ driver: 1 });
bookingSchema.index({ 'repActions.pickupFromOwner.status': 1 });
bookingSchema.index({ 'repActions.deliverToUser.status': 1 });

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;