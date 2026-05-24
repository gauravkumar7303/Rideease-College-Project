// models/User.js - SIMPLEST WORKING VERSION
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true 
  },
  phone: { 
    type: String, 
    required: true,
    unique: true,
    trim: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  
  userType: { 
    type: String, 
    enum: ['customer', 'driver', 'owner', 'admin'], 
    default: 'customer' 
  },
  
  // Verification
  isEmailVerified: { 
    type: Boolean, 
    default: false 
  },
  verificationOTP: String,
  otpExpiry: Date,
  
  // Timestamps
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Remove password from response
userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    delete ret.verificationOTP;
    return ret;
  }
});

// Export model
export default mongoose.models.User || mongoose.model('User', userSchema);