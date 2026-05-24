// import mongoose from 'mongoose';

// const vehicleSchema = new mongoose.Schema({
//   owner: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User', 
//     required: true 
//   },
//   vehicleType: { 
//     type: String, 
//     enum: ['car', 'bike'], 
//     required: true 
//   },
//   brand: { 
//     type: String, 
//     required: true 
//   },
//   model: { 
//     type: String, 
//     required: true 
//   },
//   year: { 
//     type: Number, 
//     required: true 
//   },
  
//   registrationNumber: { 
//     type: String, 
//     required: true, 
//     unique: true 
//   },
//   rcBookImage: String,
//   insuranceImage: String,
//   insuranceValidUntil: Date,
  
//   fuelType: { 
//     type: String, 
//     enum: ['petrol', 'diesel', 'electric', 'cng'] 
//   },
//   transmission: { 
//     type: String, 
//     enum: ['manual', 'automatic'] 
//   },
//   seats: { 
//     type: Number, 
//     default: 2 
//   },
  
//   features: [String],
  
//   images: [{
//     data: { 
//       type: String, 
//       required: true 
//     },
//     isPrimary: { 
//       type: Boolean, 
//       default: false 
//     },
//     uploadedAt: { 
//       type: Date, 
//       default: Date.now 
//     }
//   }],
  
//   location: { 
//     type: String, 
//     required: true 
//   },
//   latitude: Number,
//   longitude: Number,
//   address: String,
  
//   pricePerDay: { 
//     type: Number, 
//     required: true 
//   },
//   pricePerWeek: Number,
//   pricePerMonth: Number,
//   securityDeposit: { 
//     type: Number, 
//     default: 5000 
//   },
  
//   isAvailable: { 
//     type: Boolean, 
//     default: true 
//   },
//   availableFrom: Date,
//   availableTo: Date,
  
//   rating: { 
//     type: Number, 
//     default: 0 
//   },
//   totalBookings: { 
//     type: Number, 
//     default: 0 
//   },
//   totalEarnings: { 
//     type: Number, 
//     default: 0 
//   },
  
//   isVerified: { 
//     type: Boolean, 
//     default: false 
//   },
//   verifiedBy: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User' 
//   },
//   verificationDate: Date,
  
//   description: String

// }, { 
//   timestamps: true // ✅ This automatically handles createdAt and updatedAt
// });

// // ✅ IMPORTANT: NO pre-save hook here! Completely removed!

// // Indexes for better performance
// vehicleSchema.index({ registrationNumber: 1 }, { unique: true });
// vehicleSchema.index({ owner: 1 });
// vehicleSchema.index({ location: 1 });
// vehicleSchema.index({ vehicleType: 1 });
// vehicleSchema.index({ isAvailable: 1, isVerified: 1 });

// // ✅ Check if model exists before creating
// const Vehicle = mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);

import mongoose from 'mongoose';
import './User'; // ✅ Import User model first

const vehicleSchema = new mongoose.Schema({
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  vehicleType: { 
    type: String, 
    enum: ['car', 'bike'], 
    required: true 
  },
  brand: { 
    type: String, 
    required: true 
  },
  model: { 
    type: String, 
    required: true 
  },
  year: { 
    type: Number, 
    required: true 
  },
  
  registrationNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },
  rcBookImage: String,
  insuranceImage: String,
  insuranceValidUntil: Date,
  
  fuelType: { 
    type: String, 
    enum: ['petrol', 'diesel', 'electric', 'cng'] 
  },
  transmission: { 
    type: String, 
    enum: ['manual', 'automatic'] 
  },
  seats: { 
    type: Number, 
    default: 2 
  },
  
  features: [String],
  
  images: [{
    data: { 
      type: String, 
      required: true 
    },
    isPrimary: { 
      type: Boolean, 
      default: false 
    },
    uploadedAt: { 
      type: Date, 
      default: Date.now 
    }
  }],
  
  location: { 
    type: String, 
    required: true 
  },
  latitude: Number,
  longitude: Number,
  address: String,
  
  pricePerDay: { 
    type: Number, 
    required: true 
  },
  pricePerWeek: Number,
  pricePerMonth: Number,
  securityDeposit: { 
    type: Number, 
    default: 5000 
  },
  
  isAvailable: { 
    type: Boolean, 
    default: true 
  },
  availableFrom: Date,
  availableTo: Date,
  
  rating: { 
    type: Number, 
    default: 0 
  },
  totalBookings: { 
    type: Number, 
    default: 0 
  },
  totalEarnings: { 
    type: Number, 
    default: 0 
  },
  
  isVerified: { 
    type: Boolean, 
    default: false 
  },
  verifiedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  verificationDate: Date,
  
  description: String

}, { 
  timestamps: true
});

// // Indexes for better performance
// vehicleSchema.index({ registrationNumber: 1 }, { unique: true });
// vehicleSchema.index({ owner: 1 });
// vehicleSchema.index({ location: 1 });
// vehicleSchema.index({ vehicleType: 1 });
// vehicleSchema.index({ isAvailable: 1, isVerified: 1 });
// KEEP only these:
vehicleSchema.index({ owner: 1 });
vehicleSchema.index({ location: 1 });
vehicleSchema.index({ vehicleType: 1 });
vehicleSchema.index({ isAvailable: 1, isVerified: 1 });

const Vehicle = mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;