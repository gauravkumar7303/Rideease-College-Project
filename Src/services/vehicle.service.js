import Vehicle from '@/Src/models/Vehicle';

export class VehicleService {
  static async getAllVehicles(filters = {}) {
    const query = {};
    
    if (filters.type) query.vehicleType = filters.type;
    if (filters.location) query.location = { $regex: filters.location, $options: 'i' };
    if (filters.minPrice || filters.maxPrice) {
      query.pricePerDay = {};
      if (filters.minPrice) query.pricePerDay.$gte = parseInt(filters.minPrice);
      if (filters.maxPrice) query.pricePerDay.$lte = parseInt(filters.maxPrice);
    }
    
    query.isAvailable = true;
    
    const vehicles = await Vehicle.find(query)
      .populate('owner', 'name rating')
      .sort({ createdAt: -1 })
      .limit(50);
    
    return vehicles;
  }
  
  static async getVehicleById(id) {
    const vehicle = await Vehicle.findById(id)
      .populate('owner', 'name phone rating totalRides')
      .populate('verifiedBy', 'name');
    
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    
    return vehicle;
  }
  
  static async createVehicle(vehicleData, ownerId) {
    const vehicle = new Vehicle({
      ...vehicleData,
      owner: ownerId,
      isAvailable: true,
      isVerified: false,
    });
    
    await vehicle.save();
    
    // Populate owner info
    await vehicle.populate('owner', 'name email phone');
    
    return vehicle;
  }
  
  static async updateVehicle(id, updateData, userId) {
    const vehicle = await Vehicle.findById(id);
    
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    
    // Check ownership
    if (vehicle.owner.toString() !== userId.toString()) {
      throw new Error('Not authorized to update this vehicle');
    }
    
    Object.assign(vehicle, updateData);
    await vehicle.save();
    
    return vehicle;
  }
  
  static async addVehicleImages(vehicleId, imagesData) {
    const vehicle = await Vehicle.findById(vehicleId);
    
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    
    // Add new images
    vehicle.images.push(...imagesData.map(img => ({
      data: img.data,
      isPrimary: img.isPrimary || false
    })));
    
    await vehicle.save();
    
    return vehicle;
  }
}