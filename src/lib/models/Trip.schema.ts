// src/lib/models/Trip.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ITrip extends Document {
  vehicleId: mongoose.Types.ObjectId;
  driverId: mongoose.Types.ObjectId;
  origin: string;
  destination: string;
  cargoWeightKg: number;
  status: 'Draft' | 'Dispatched' | 'Completed' | 'Cancelled';
  startDate?: Date;
  endDate?: Date;
  revenue?: number; // Added to support your ROI formula requirement
}

const TripSchema: Schema = new Schema(
  {
    vehicleId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Vehicle', 
      required: true 
    },
    driverId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Driver', 
      required: true 
    },
    origin: { 
      type: String, 
      required: true 
    },
    destination: { 
      type: String, 
      required: true 
    },
    cargoWeightKg: { 
      type: Number, 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['Draft', 'Dispatched', 'Completed', 'Cancelled'], 
      default: 'Draft' 
    },
    startDate: { 
      type: Date 
    },
    endDate: { 
      type: Date 
    },
    revenue: { 
      type: Number, 
      default: 0 
    } 
  }, { 
    timestamps: true 
  }
);

export default mongoose.models.Trip || mongoose.model<ITrip>('Trip', TripSchema);