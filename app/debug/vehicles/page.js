'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DebugVehicles() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch('/api/vehicles?all=true')
      .then(res => res.json())
      .then(data => setVehicles(data.vehicles || []));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">All Vehicles in Database</h1>
      <div className="space-y-2">
        {vehicles.map(v => (
          <div key={v._id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <span className="font-bold">{v.brand} {v.model}</span>
              <span className="text-gray-500 ml-2">({v.vehicleType})</span>
              <div className="text-sm text-gray-400">ID: {v._id}</div>
            </div>
            <Link 
              href={`/vehicles/${v._id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}