import mongoose from 'mongoose';

// Load environment variables explicitly
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

console.log('🔍 [db.js] Initializing...');
console.log('Node Environment:', process.env.NODE_ENV);
console.log('MONGODB_URI exists:', !!MONGODB_URI);

if (!MONGODB_URI) {
  console.error('❌ FATAL: MONGODB_URI is not defined!');
  console.error('Current directory:', process.cwd());
  console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('MONGO')));
  throw new Error('Please define MONGODB_URI in .env.local file');
}

console.log('🔗 MongoDB URI loaded:');
console.log('Database:', MONGODB_URI.split('/').pop().split('?')[0]);
console.log('Host:', MONGODB_URI.split('@')[1]?.split('/')[0]);

// Optimized connection caching
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { 
    conn: null, 
    promise: null,
    isConnecting: false
  };
}

export async function connectDB() {
  console.log('🔌 [connectDB] Called from:', new Error().stack.split('\n')[2]);
  
  // If already connected, return connection
  if (cached.conn) {
    console.log('♻️ Using existing MongoDB connection');
    return cached.conn;
  }

  // If connection is in progress, wait for it
  if (cached.promise && cached.isConnecting) {
    console.log('⏳ Connection in progress, waiting...');
    return await cached.promise;
  }

  // Create new connection
  console.log('🔄 Establishing new MongoDB connection...');
  cached.isConnecting = true;
  
  cached.promise = mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 15000, // Increased timeout
    socketTimeoutMS: 60000,
    maxPoolSize: 10,
    minPoolSize: 5,
    retryWrites: true,
    w: 'majority',
    retryReads: true,
  })
    .then((mongooseInstance) => {
      console.log('✅ MongoDB Connected Successfully!');
      console.log('📊 Database:', mongooseInstance.connection.db?.databaseName);
      console.log('🏠 Host:', mongooseInstance.connection.host);
      console.log('🔄 Ready State:', mongooseInstance.connection.readyState);
      console.log('📈 Connection ID:', mongooseInstance.connection.id);
      
      // Connection event listeners
      mongooseInstance.connection.on('connected', () => {
        console.log('🔗 Mongoose connected to DB');
      });
      
      mongooseInstance.connection.on('error', (err) => {
        console.error('❌ Mongoose connection error:', err.message);
      });
      
      mongooseInstance.connection.on('disconnected', () => {
        console.log('🔌 Mongoose disconnected from DB');
      });
      
      return mongooseInstance;
    })
    .catch((error) => {
      console.error('❌ MongoDB Connection Failed:');
      console.error('Error Name:', error.name);
      console.error('Error Code:', error.code);
      console.error('Error Message:', error.message);
      
      // Specific error handling
      if (error.name === 'MongoServerSelectionError') {
        console.error('💡 Solution: Check MongoDB Atlas Network Access');
        console.error('Add your IP address or use 0.0.0.0/0 temporarily');
      } else if (error.name === 'MongoParseError') {
        console.error('💡 Solution: Check MONGODB_URI format');
      } else if (error.name === 'MongoNetworkError') {
        console.error('💡 Solution: Check internet connection and firewall');
      }
      
      cached.isConnecting = false;
      cached.promise = null;
      throw error;
    });

  try {
    cached.conn = await cached.promise;
    cached.isConnecting = false;
    return cached.conn;
  } catch (error) {
    cached.isConnecting = false;
    cached.promise = null;
    throw error;
  }
}

// Export mongoose instance for direct use
export { mongoose };