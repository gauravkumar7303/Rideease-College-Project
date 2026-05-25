import { NextResponse } from 'next/server';
import { connectDB } from '@/Src/lib/db';
import Vehicle from '@/Src/models/Vehicle';
import User from '@/Src/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await connectDB();
    
    // ✅ Clear existing data (optional)
    await Vehicle.deleteMany({});
    await User.deleteMany({ role: { $in: ['driver', 'rep'] } });
    
    // ========== 1. CREATE OWNER (Vehicle Owner) ==========
    const owner = await User.findOneAndUpdate(
      { email: 'owner@rideease.com' },
      {
        name: 'RideEase Motors',
        email: 'owner@rideease.com',
        phone: '9999999991',
        password: await bcrypt.hash('owner123', 10),
        role: 'owner',
        ownerDetails: {
          businessName: 'RideEase Motors Pvt Ltd',
          gstNumber: '07AAACA1234E1Z',
          totalVehicles: 10
        }
      },
      { upsert: true, new: true }
    );
    
    // ========== 2. CREATE CARS (Real Cars Data) ==========
    const cars = [
      {
        owner: owner._id,
        vehicleType: 'car',
        brand: 'Maruti Suzuki',
        model: 'Swift',
        year: 2023,
        registrationNumber: 'DL1CAB1234',
        fuelType: 'petrol',
        transmission: 'manual',
        seats: 5,
        features: ['AC', 'Power Steering', 'Airbags', 'ABS', 'Music System'],
        images: [{ data: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/135875/swift-exterior-right-front-three-quarter-3.jpeg' }],
        location: 'Delhi - Connaught Place',
        pricePerDay: 1499,
        securityDeposit: 5000,
        isVerified: true,
        isAvailable: true,
        description: 'Perfect for city drives. Fuel efficient and comfortable.'
      },
      {
        owner: owner._id,
        vehicleType: 'car',
        brand: 'Hyundai',
        model: 'i20',
        year: 2023,
        registrationNumber: 'DL2CAB5678',
        fuelType: 'petrol',
        transmission: 'automatic',
        seats: 5,
        features: ['AC', 'Power Steering', 'Airbags', 'ABS', 'Sunroof', 'Touchscreen'],
        images: [{ data: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/130063/i20-exterior-right-front-three-quarter-3.jpeg' }],
        location: 'Gurugram - Cyber City',
        pricePerDay: 1999,
        securityDeposit: 7000,
        isVerified: true,
        isAvailable: true,
        description: 'Premium hatchback with automatic transmission.'
      },
      {
        owner: owner._id,
        vehicleType: 'car',
        brand: 'Toyota',
        model: 'Innova Crysta',
        year: 2022,
        registrationNumber: 'DL3CAB9012',
        fuelType: 'diesel',
        transmission: 'manual',
        seats: 7,
        features: ['AC', 'Power Steering', 'Airbags', 'ABS', 'Captain Seats', 'Rear AC'],
        images: [{ data: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/134395/innova-crysta-exterior-right-front-three-quarter-2.jpeg' }],
        location: 'Delhi - Aerocity',
        pricePerDay: 3499,
        securityDeposit: 10000,
        isVerified: true,
        isAvailable: true,
        description: 'Perfect for family trips. Spacious and comfortable.'
      },
      {
        owner: owner._id,
        vehicleType: 'car',
        brand: 'Mahindra',
        model: 'XUV700',
        year: 2023,
        registrationNumber: 'DL4CAB3456',
        fuelType: 'diesel',
        transmission: 'automatic',
        seats: 7,
        features: ['AC', 'Power Steering', 'Airbags', 'ABS', 'Sunroof', '360 Camera', 'ADAS'],
        images: [{ data: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/136175/xuv700-exterior-right-front-three-quarter-2.jpeg' }],
        location: 'Gurugram - Sector 29',
        pricePerDay: 3999,
        securityDeposit: 12000,
        isVerified: true,
        isAvailable: true,
        description: 'Luxury SUV with all modern features.'
      },
      {
        owner: owner._id,
        vehicleType: 'car',
        brand: 'Hyundai',
        model: 'Creta',
        year: 2023,
        registrationNumber: 'DL5CAB7890',
        fuelType: 'petrol',
        transmission: 'automatic',
        seats: 5,
        features: ['AC', 'Power Steering', 'Airbags', 'ABS', 'Sunroof', 'Bose Speakers'],
        images: [{ data: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/139577/creta-exterior-right-front-three-quarter-2.jpeg' }],
        location: 'Delhi - Connaught Place',
        pricePerDay: 2799,
        securityDeposit: 8000,
        isVerified: true,
        isAvailable: true,
        description: 'Premium SUV with stylish looks.'
      }
    ];
    
    // ========== 3. CREATE BIKES (Real Bikes Data) ==========
    const bikes = [
      {
        owner: owner._id,
        vehicleType: 'bike',
        brand: 'Honda',
        model: 'Activa 6G',
        year: 2023,
        registrationNumber: 'DL6BIKE111',
        fuelType: 'petrol',
        transmission: 'automatic',
        seats: 2,
        features: ['Electric Start', 'Digital Meter', 'LED Light', 'Boot Space'],
        images: [{ data: 'https://cdnp1.stackassets.com/6aa0c9cd03d32a058d88f11db0077fcd1b4d2d00/store/opt/596/447/fba0be7bc3a5d6a35e7537aadf69579e5c0c2147c5671b1e97345763e705/product/21190-honda-activa-6g-image-1.jpeg' }],
        location: 'Delhi - Connaught Place',
        pricePerDay: 399,
        securityDeposit: 2000,
        isVerified: true,
        isAvailable: true,
        description: 'Best selling scooter. Perfect for daily commute.'
      },
      {
        owner: owner._id,
        vehicleType: 'bike',
        brand: 'TVS',
        model: 'Jupiter 125',
        year: 2023,
        registrationNumber: 'DL7BIKE222',
        fuelType: 'petrol',
        transmission: 'automatic',
        seats: 2,
        features: ['Electric Start', 'Digital Meter', 'LED Light', 'Big Boot'],
        images: [{ data: 'https://cdnp2.stackassets.com/ef364da2d2988eac279f6b9edec7ae5dda94d58a/store/opt/596/447/37d331b65f0a95a166cf7973ae5c382233e242708f7acbd0f51c727c8c56/product/34238-tvs-jupiter-125-image-1.jpeg' }],
        location: 'Gurugram - Cyber City',
        pricePerDay: 449,
        securityDeposit: 2500,
        isVerified: true,
        isAvailable: true,
        description: 'Comfortable scooter with large boot space.'
      },
      {
        owner: owner._id,
        vehicleType: 'bike',
        brand: 'Royal Enfield',
        model: 'Classic 350',
        year: 2022,
        registrationNumber: 'DL8BIKE333',
        fuelType: 'petrol',
        transmission: 'manual',
        seats: 2,
        features: ['ABS', 'Dual Channel', 'Tripper Navigation', 'Retro Style'],
        images: [{ data: 'https://cdnp0.stackassets.com/4be5e5dce81a000a1567d53d6d86122c2c399f5e/store/opt/596/447/7a07ce0312e5a6691c541644f22828a3733f7e39fd15cb1b4a122ae6130f/product/18239-classic-350-stealth-black-image-1.jpeg' }],
        location: 'Gurugram - Sector 29',
        pricePerDay: 999,
        securityDeposit: 5000,
        isVerified: true,
        isAvailable: true,
        description: 'Iconic cruiser bike for long rides.'
      },
      {
        owner: owner._id,
        vehicleType: 'bike',
        brand: 'Bajaj',
        model: 'Pulsar NS200',
        year: 2023,
        registrationNumber: 'DL9BIKE444',
        fuelType: 'petrol',
        transmission: 'manual',
        seats: 2,
        features: ['ABS', 'LED Lights', 'Digital Console', 'Sporty Look'],
        images: [{ data: 'https://cdnp1.stackassets.com/9a2ab4202334f40ca343ea51b11ef59740bc5244/store/opt/596/447/c3cce1a37b2d64fa1c74a49852b4731c5263c05984bc03bb066fe95a72c8/product/35535-pulsar-ns200-image-1.jpeg' }],
        location: 'Delhi - Aerocity',
        pricePerDay: 799,
        securityDeposit: 4000,
        isVerified: true,
        isAvailable: true,
        description: 'Sporty bike with great performance.'
      }
    ];
    
    // Insert vehicles
    const allVehicles = [...cars, ...bikes];
    const insertedVehicles = await Vehicle.insertMany(allVehicles);
    console.log(`✅ Inserted ${insertedVehicles.length} vehicles`);
    
    // ========== 4. CREATE DRIVERS ==========
    const drivers = [
      {
        name: 'Rajesh Kumar',
        email: 'driver.rajesh@rideease.com',
        phone: '9876543211',
        password: await bcrypt.hash('driver123', 10),
        role: 'driver',
        driverDetails: {
          licenseNumber: 'DLR0012345',
          experience: 5,
          vehicleType: ['car'],
          isVerified: true,
          rating: 4.8,
          totalTrips: 150,
          languages: ['hindi', 'english'],
          availability: true
        }
      },
      {
        name: 'Amit Sharma',
        email: 'driver.amit@rideease.com',
        phone: '9876543212',
        password: await bcrypt.hash('driver123', 10),
        role: 'driver',
        driverDetails: {
          licenseNumber: 'DLR0067890',
          experience: 3,
          vehicleType: ['car', 'bike'],
          isVerified: true,
          rating: 4.6,
          totalTrips: 80,
          languages: ['hindi', 'english', 'punjabi'],
          availability: true
        }
      },
      {
        name: 'Vikram Singh',
        email: 'driver.vikram@rideease.com',
        phone: '9876543213',
        password: await bcrypt.hash('driver123', 10),
        role: 'driver',
        driverDetails: {
          licenseNumber: 'DLR0011122',
          experience: 7,
          vehicleType: ['car'],
          isVerified: true,
          rating: 4.9,
          totalTrips: 250,
          languages: ['hindi', 'english'],
          availability: true
        }
      }
    ];
    
    const insertedDrivers = await User.insertMany(drivers);
    console.log(`✅ Inserted ${insertedDrivers.length} drivers`);
    
    // ========== 5. CREATE REPRESENTATIVES ==========
    const representatives = [
      {
        name: 'Suresh Yadav',
        email: 'rep.suresh@rideease.com',
        phone: '9999999901',
        password: await bcrypt.hash('rep123', 10),
        role: 'rep',
        repDetails: {
          employeeId: 'REP001',
          zone: 'Delhi',
          isActive: true,
          totalDeliveries: 0
        }
      },
      {
        name: 'Manoj Gupta',
        email: 'rep.manoj@rideease.com',
        phone: '9999999902',
        password: await bcrypt.hash('rep123', 10),
        role: 'rep',
        repDetails: {
          employeeId: 'REP002',
          zone: 'Gurugram',
          isActive: true,
          totalDeliveries: 0
        }
      }
    ];
    
    const insertedReps = await User.insertMany(representatives);
    console.log(`✅ Inserted ${insertedReps.length} representatives`);
    
    return NextResponse.json({
      success: true,
      message: '✅ Database seeded successfully!',
      stats: {
        vehicles: insertedVehicles.length,
        drivers: insertedDrivers.length,
        representatives: insertedReps.length
      },
      sampleData: {
        owner: { email: 'owner@rideease.com', password: 'owner123' },
        drivers: drivers.map(d => ({ email: d.email, password: 'driver123' })),
        reps: representatives.map(r => ({ email: r.email, password: 'rep123' }))
      }
    });
    
  } catch (error) {
    console.error('❌ Seed error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}