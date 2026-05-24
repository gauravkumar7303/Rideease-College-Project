// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '@/Src/models/User';
// import { EmailService } from '@/Src/services/email.service'; // ✅ ADD THIS IMPORT
// import { connectDB } from '@/Src/lib/db';

// export class AuthService {
  
//   // Generate 6-digit OTP
//   static generateOTP() {
//     return Math.floor(100000 + Math.random() * 900000).toString();
//   }

//   // Register new user
//   static async registerUser(userData) {
//     console.log('🔐 [AuthService] Registering user:', userData.email);
    
//     try {
//       // Ensure database connection
//       await connectDB();
//       console.log('✅ Database connected in AuthService');
      
//       const { email, password, name, phone, userType } = userData;
      
//       // Check if user already exists
//       console.log('🔍 Checking existing user...');
//       const existingUser = await User.findOne({ 
//         $or: [{ email: email.toLowerCase() }, { phone }] 
//       });
      
//       if (existingUser) {
//         console.log('❌ User already exists with email/phone:', email);
//         throw new Error('User with this email or phone already exists');
//       }
      
//       // Hash password
//       console.log('🔒 Hashing password...');
//       const hashedPassword = await bcrypt.hash(password, 12);
      
//       // Generate OTP
//       const otp = this.generateOTP();
//       const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      
//       console.log('📧 Generated OTP for:', email);
      
//       // Create user
//       const user = new User({
//         email: email.toLowerCase(),
//         password: hashedPassword,
//         name,
//         phone,
//         userType: userType || 'customer',
//         verificationOTP: otp,
//         otpExpiry: otpExpiry,
//         isEmailVerified: false,
//       });
      
//       console.log('💾 Saving user to database...');
//       await user.save();
//       console.log('✅ User saved successfully:', user._id);
      
//       // ✅ ENHANCED OTP DISPLAY FOR TESTING
//       console.log('\n' + '='.repeat(60));
//       console.log('📧 EMAIL VERIFICATION REQUIRED');
//       console.log('='.repeat(60));
//       console.log(`👤 User: ${name}`);
//       console.log(`📧 Email: ${email}`);
//       console.log(`📱 Phone: ${phone}`);
//       console.log(`🔐 OTP: ${otp}`);
//       console.log(`⏰ Valid until: ${otpExpiry.toLocaleTimeString()}`);
//       console.log('📝 Use this OTP in verification screen');
//       console.log('='.repeat(60) + '\n');
      
//       // ✅ SEND ACTUAL OTP EMAIL - UNCOMMENTED AND FIXED
//       try {
//         console.log('📧 Attempting to send OTP email...');
//         await EmailService.sendOTP(email, otp); // ✅ UNCOMMENT THIS LINE
//         console.log('✅ OTP email sent successfully!');
//       } catch (emailError) {
//         console.error('⚠️ Failed to send OTP email:', emailError.message);
//         // Don't fail registration if email fails
//         console.log('⚠️ Registration continues without email. Check console for OTP.');
//       }
      
//       // Create response object
//       const userResponse = user.toJSON();
      
//       return {
//         success: true,
//         message: 'Registration successful. OTP sent to your email.',
//         user: userResponse,
//         email: email,
//         // ✅ Add OTP to response for development/testing
//         _debug: process.env.NODE_ENV === 'development' ? {
//           otp: otp,
//           expiry: otpExpiry
//         } : undefined
//       };
      
//     } catch (error) {
//       console.error('💥 AuthService.registerUser error:', error);
      
//       // MongoDB duplicate key error
//       if (error.code === 11000) {
//         const field = Object.keys(error.keyPattern)[0];
//         throw new Error(`This ${field} is already registered`);
//       }
      
//       // Mongoose validation error
//       if (error.name === 'ValidationError') {
//         const messages = Object.values(error.errors).map(err => err.message);
//         throw new Error(messages.join(', '));
//       }
      
//       throw error;
//     }
//   }
  
//   // Login user
//   static async loginUser(email, password) {
//     console.log('🔐 [AuthService] Login attempt for:', email);
    
//     try {
//       await connectDB();
      
//       // Find user by email (case insensitive)
//       const user = await User.findOne({ 
//         email: email.toLowerCase() 
//       }).select('+password'); // Include password field
      
//       if (!user) {
//         console.log('❌ User not found:', email);
//         throw new Error('Invalid email or password');
//       }
      
//       // Check password
//       const isPasswordValid = await bcrypt.compare(password, user.password);
      
//       if (!isPasswordValid) {
//         console.log('❌ Invalid password for:', email);
//         throw new Error('Invalid email or password');
//       }
      
//       // Check email verification
//       if (!user.isEmailVerified) {
//         console.log('⚠️ Email not verified for:', email);
//         console.log('💡 OTP for testing (if available):', user.verificationOTP || 'No OTP found');
//         throw new Error('Please verify your email first. Check your inbox for OTP.');
//       }
      
//       // Generate JWT token
//       const token = jwt.sign(
//         { 
//           userId: user._id,
//           email: user.email,
//           userType: user.userType,
//           name: user.name
//         },
//         process.env.JWT_SECRET,
//         { expiresIn: '7d' }
//       );
      
//       console.log('✅ Login successful for:', email);
      
//       return { 
//         success: true,
//         token, 
//         user: user.toJSON() 
//       };
      
//     } catch (error) {
//       console.error('💥 AuthService.loginUser error:', error);
//       throw error;
//     }
//   }
  
//   // Verify email with OTP
//   static async verifyEmail(email, otp) {
//     console.log('✅ [AuthService] Verifying email:', email);
//     console.log('🔑 Submitted OTP:', otp);
    
//     try {
//       await connectDB();
      
//       const user = await User.findOne({ 
//         email: email.toLowerCase() 
//       });
      
//       if (!user) {
//         throw new Error('User not found');
//       }
      
//       // Check if already verified
//       if (user.isEmailVerified) {
//         console.log('ℹ️ Email already verified for:', email);
//         throw new Error('Email already verified');
//       }
      
//       // Check if OTP exists
//       if (!user.verificationOTP) {
//         console.log('❌ No OTP found for:', email);
//         throw new Error('No pending verification for this email');
//       }
      
//       // Check OTP expiry
//       if (new Date() > user.otpExpiry) {
//         console.log('⏰ OTP expired for:', email);
//         console.log('OTP expiry time:', user.otpExpiry);
//         console.log('Current time:', new Date());
        
//         // Clear expired OTP
//         user.verificationOTP = undefined;
//         user.otpExpiry = undefined;
//         await user.save();
        
//         throw new Error('OTP has expired. Please request a new one.');
//       }
      
//       console.log('✅ OTP in database:', user.verificationOTP);
//       console.log('✅ OTP expiry:', user.otpExpiry);
      
//       // Verify OTP
//       if (user.verificationOTP !== otp) {
//         console.log('❌ OTP mismatch');
//         console.log('Database OTP:', user.verificationOTP);
//         console.log('Submitted OTP:', otp);
//         throw new Error('Invalid OTP');
//       }
      
//       // Mark email as verified
//       user.isEmailVerified = true;
//       user.verificationOTP = undefined;
//       user.otpExpiry = undefined;
//       await user.save();
      
//       console.log('✅ Email verified successfully for:', email);
      
//       // ✅ SEND WELCOME EMAIL
//       try {
//         await EmailService.sendWelcomeEmail(email, user.name);
//         console.log('✅ Welcome email sent to:', email);
//       } catch (welcomeError) {
//         console.error('⚠️ Welcome email failed:', welcomeError.message);
//       }
      
//       return {
//         success: true,
//         message: 'Email verified successfully',
//         user: user.toJSON()
//       };
      
//     } catch (error) {
//       console.error('💥 AuthService.verifyEmail error:', error);
//       throw error;
//     }
//   }

//   // Resend OTP
//   static async resendOTP(email) {
//     console.log('🔄 [AuthService] Resending OTP to:', email);
    
//     try {
//       await connectDB();
      
//       const user = await User.findOne({ 
//         email: email.toLowerCase() 
//       });
      
//       if (!user) {
//         throw new Error('User not found');
//       }
      
//       if (user.isEmailVerified) {
//         throw new Error('Email already verified');
//       }
      
//       // Generate new OTP
//       const otp = this.generateOTP();
//       const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
      
//       user.verificationOTP = otp;
//       user.otpExpiry = otpExpiry;
//       await user.save();
      
//       // ✅ ENHANCED OTP DISPLAY FOR RESEND
//       console.log('\n' + '='.repeat(60));
//       console.log('🔄 OTP RESENT');
//       console.log('='.repeat(60));
//       console.log(`📧 Email: ${email}`);
//       console.log(`🔐 New OTP: ${otp}`);
//       console.log(`⏰ Valid until: ${otpExpiry.toLocaleTimeString()}`);
//       console.log('='.repeat(60) + '\n');
      
//       // ✅ SEND ACTUAL RESEND OTP EMAIL
//       try {
//         console.log('📧 Attempting to resend OTP email...');
//         await EmailService.sendOTP(email, otp); // ✅ UNCOMMENT THIS LINE
//         console.log('✅ OTP resent successfully!');
//       } catch (emailError) {
//         console.error('⚠️ Failed to resend OTP email:', emailError.message);
//         throw new Error('Failed to send verification email. Please try again.');
//       }
      
//       return {
//         success: true,
//         message: 'OTP sent to your email',
//         email: email,
//         // ✅ Add OTP to response for development/testing
//         _debug: process.env.NODE_ENV === 'development' ? {
//           otp: otp,
//           expiry: otpExpiry
//         } : undefined
//       };
      
//     } catch (error) {
//       console.error('💥 AuthService.resendOTP error:', error);
//       throw error;
//     }
//   }
  
//   // Get user by ID (for authentication middleware)
//   static async getUserById(userId) {
//     try {
//       await connectDB();
//       const user = await User.findById(userId);
//       return user ? user.toJSON() : null;
//     } catch (error) {
//       console.error('Error getting user by ID:', error);
//       return null;
//     }
//   }
// }
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@/Src/models/User';
import { EmailService } from '@/Src/services/email.service';
import { connectDB } from '@/Src/lib/db';

export class AuthService {
  
  // Generate 6-digit OTP
  static generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Register new user
  static async registerUser(userData) {
    console.log('🔐 [AuthService] Registering user:', userData.email);
    
    try {
      await connectDB();
      console.log('✅ Database connected in AuthService');
      
      const { email, password, name, phone, userType } = userData;
      
      // Check if user already exists
      console.log('🔍 Checking existing user...');
      const existingUser = await User.findOne({ 
        $or: [{ email: email.toLowerCase() }, { phone }] 
      });
      
      if (existingUser) {
        console.log('❌ User already exists with email/phone:', email);
        throw new Error('User with this email or phone already exists');
      }
      
      // Hash password
      console.log('🔒 Hashing password...');
      const hashedPassword = await bcrypt.hash(password, 12);
      
      // Generate OTP
      const otp = this.generateOTP();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      
      console.log('📧 Generated OTP for:', email);
      
      // Create user
      const user = new User({
        email: email.toLowerCase(),
        password: hashedPassword,
        name,
        phone,
        userType: userType || 'customer',
        verificationOTP: otp,
        otpExpiry: otpExpiry,
        isEmailVerified: false,
      });
      
      console.log('💾 Saving user to database...');
      await user.save();
      console.log('✅ User saved successfully:', user._id);
      
      // ✅ ENHANCED OTP DISPLAY FOR TESTING
      console.log('\n' + '='.repeat(60));
      console.log('📧 EMAIL VERIFICATION REQUIRED');
      console.log('='.repeat(60));
      console.log(`👤 User: ${name}`);
      console.log(`📧 Email: ${email}`);
      console.log(`📱 Phone: ${phone}`);
      console.log(`🔐 OTP: ${otp}`);
      console.log(`⏰ Valid until: ${otpExpiry.toLocaleTimeString()}`);
      console.log('📝 Use this OTP in verification screen');
      console.log('='.repeat(60) + '\n');
      
      // ✅ SEND ACTUAL OTP EMAIL
      try {
        console.log('📧 Attempting to send OTP email...');
        await EmailService.sendOTP(email, otp);
        console.log('✅ OTP email sent successfully!');
      } catch (emailError) {
        console.error('⚠️ Failed to send OTP email:', emailError.message);
        console.log('⚠️ Registration continues without email. Check console for OTP.');
      }
      
      // Create response object
      const userResponse = user.toJSON();
      delete userResponse.password;
      delete userResponse.verificationOTP;
      
      return {
        success: true,
        message: 'Registration successful. OTP sent to your email.',
        user: userResponse,
        email: email,
        // ✅ Add OTP to response for development/testing
        _debug: process.env.NODE_ENV === 'development' ? {
          otp: otp,
          expiry: otpExpiry
        } : undefined
      };
      
    } catch (error) {
      console.error('💥 AuthService.registerUser error:', error);
      
      // MongoDB duplicate key error
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        throw new Error(`This ${field} is already registered`);
      }
      
      // Mongoose validation error
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        throw new Error(messages.join(', '));
      }
      
      throw error;
    }
  }
  
  // Login user
  static async loginUser(email, password) {
    console.log('🔐 [AuthService] Login attempt for:', email);
    
    try {
      await connectDB();
      
      // Find user by email (case insensitive)
      const user = await User.findOne({ 
        email: email.toLowerCase() 
      }).select('+password');
      
      if (!user) {
        console.log('❌ User not found:', email);
        throw new Error('Invalid email or password');
      }
      
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        console.log('❌ Invalid password for:', email);
        throw new Error('Invalid email or password');
      }
      
      // Check email verification
      if (!user.isEmailVerified) {
        console.log('⚠️ Email not verified for:', email);
        throw new Error('Please verify your email first. Check your inbox for OTP.');
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user._id,
          email: user.email,
          userType: user.userType,
          name: user.name
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      
      console.log('✅ Login successful for:', email);
      
      const userResponse = user.toJSON();
      delete userResponse.password;
      delete userResponse.verificationOTP;
      
      return { 
        success: true,
        token, 
        user: userResponse 
      };
      
    } catch (error) {
      console.error('💥 AuthService.loginUser error:', error);
      throw error;
    }
  }
  
  // Verify email with OTP
  static async verifyEmail(email, otp) {
    console.log('✅ [AuthService] Verifying email:', email);
    console.log('🔑 Submitted OTP:', otp);
    
    try {
      await connectDB();
      
      const user = await User.findOne({ 
        email: email.toLowerCase() 
      });
      
      if (!user) {
        throw new Error('User not found');
      }
      
      // Check if already verified
      if (user.isEmailVerified) {
        console.log('ℹ️ Email already verified for:', email);
        throw new Error('Email already verified');
      }
      
      // Check if OTP exists
      if (!user.verificationOTP) {
        console.log('❌ No OTP found for:', email);
        throw new Error('No pending verification for this email');
      }
      
      // Check OTP expiry
      if (new Date() > user.otpExpiry) {
        console.log('⏰ OTP expired for:', email);
        
        // Clear expired OTP
        user.verificationOTP = undefined;
        user.otpExpiry = undefined;
        await user.save();
        
        throw new Error('OTP has expired. Please request a new one.');
      }
      
      console.log('✅ OTP in database:', user.verificationOTP);
      console.log('✅ OTP expiry:', user.otpExpiry);
      
      // Verify OTP
      if (user.verificationOTP !== otp) {
        console.log('❌ OTP mismatch');
        console.log('Database OTP:', user.verificationOTP);
        console.log('Submitted OTP:', otp);
        throw new Error('Invalid OTP');
      }
      
      // ✅ CRITICAL: Mark email as verified
      console.log('✅ OTP matched! Updating user verification status...');
      
      user.isEmailVerified = true;
      user.verificationOTP = undefined;
      user.otpExpiry = undefined;
      await user.save();
      
      console.log('✅ User updated successfully! isEmailVerified =', user.isEmailVerified);
      console.log('✅ Email verified successfully for:', email);
      
      // ✅ SEND WELCOME EMAIL
      try {
        await EmailService.sendWelcomeEmail(email, user.name);
        console.log('✅ Welcome email sent to:', email);
      } catch (welcomeError) {
        console.error('⚠️ Welcome email failed:', welcomeError.message);
      }
      
      const userResponse = user.toJSON();
      delete userResponse.password;
      delete userResponse.verificationOTP;
      
      return {
        success: true,
        message: 'Email verified successfully',
        user: userResponse
      };
      
    } catch (error) {
      console.error('💥 AuthService.verifyEmail error:', error);
      throw error;
    }
  }

  // Resend OTP
  static async resendOTP(email) {
    console.log('🔄 [AuthService] Resending OTP to:', email);
    
    try {
      await connectDB();
      
      const user = await User.findOne({ 
        email: email.toLowerCase() 
      });
      
      if (!user) {
        throw new Error('User not found');
      }
      
      if (user.isEmailVerified) {
        throw new Error('Email already verified');
      }
      
      // Generate new OTP
      const otp = this.generateOTP();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
      
      user.verificationOTP = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
      
      // ✅ ENHANCED OTP DISPLAY FOR RESEND
      console.log('\n' + '='.repeat(60));
      console.log('🔄 OTP RESENT');
      console.log('='.repeat(60));
      console.log(`📧 Email: ${email}`);
      console.log(`🔐 New OTP: ${otp}`);
      console.log(`⏰ Valid until: ${otpExpiry.toLocaleTimeString()}`);
      console.log('='.repeat(60) + '\n');
      
      // ✅ SEND ACTUAL RESEND OTP EMAIL
      try {
        console.log('📧 Attempting to resend OTP email...');
        await EmailService.sendOTP(email, otp);
        console.log('✅ OTP resent successfully!');
      } catch (emailError) {
        console.error('⚠️ Failed to resend OTP email:', emailError.message);
        throw new Error('Failed to send verification email. Please try again.');
      }
      
      return {
        success: true,
        message: 'OTP sent to your email',
        email: email,
        // ✅ Add OTP to response for development/testing
        _debug: process.env.NODE_ENV === 'development' ? {
          otp: otp,
          expiry: otpExpiry
        } : undefined
      };
      
    } catch (error) {
      console.error('💥 AuthService.resendOTP error:', error);
      throw error;
    }
  }
  
  // Get user by ID (for authentication middleware)
  static async getUserById(userId) {
    try {
      await connectDB();
      const user = await User.findById(userId);
      return user ? user.toJSON() : null;
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return null;
    }
  }
}