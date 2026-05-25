'use client';
import { useState, useEffect } from 'react';

export default function DebugPage() {
  const [drivers, setDrivers] = useState([]);
  const [reps, setReps] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/drivers/available').then(r => r.json()),
      fetch('/api/reps/available').then(r => r.json()),
      fetch('/api/vehicles?all=true').then(r => r.json())
    ]).then(([driversData, repsData, vehiclesData]) => {
      setDrivers(driversData.drivers || []);
      setReps(repsData.reps || []);
      setVehicles(vehiclesData.vehicles || []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">🔍 Database Status</h1>
      
      {/* Vehicles */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">🚗 Vehicles ({vehicles.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {vehicles.map(v => (
            <div key={v._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-semibold">{v.brand} {v.model}</span>
                <span className="text-sm text-gray-500 ml-2">({v.vehicleType})</span>
              </div>
              <div className="text-blue-600 font-bold">₹{v.pricePerDay}/day</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Drivers */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">👨‍✈️ Drivers ({drivers.length})</h2>
        <div className="space-y-2">
          {drivers.map(d => (
            <div key={d._id} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div>
                <span className="font-semibold">{d.name}</span>
                <span className="text-sm text-gray-500 ml-2">{d.phone}</span>
              </div>
              <div className="text-green-600">⭐ {d.driverDetails?.rating || 4.5}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Representatives */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">👔 Representatives ({reps.length})</h2>
        <div className="space-y-2">
          {reps.map(r => (
            <div key={r._id} className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <div>
                <span className="font-semibold">{r.name}</span>
                <span className="text-sm text-gray-500 ml-2">{r.repDetails?.zone}</span>
              </div>
              <div className="text-purple-600">ID: {r.repDetails?.employeeId}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}