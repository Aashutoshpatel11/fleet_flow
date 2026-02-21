import mongoose, { Schema, Document } from 'mongoose';

export interface IVehicle extends Document {
  name: string;
  licensePlate: string;
  maxCapacityKg: number;
  currentOdometer: number;
  status: 'Available' | 'On Trip' | 'In Shop' | 'Out of Service';
}

const VehicleSchema: Schema = new Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    licensePlate: { 
      type: String, 
      required: true, 
      unique: true 
    },
    maxCapacityKg: { 
      type: Number, 
      required: true },
    currentOdometer: { 
      type: Number, 
      required: true, 
      default: 0 
    },
    status: { 
      type: String, 
      enum: ['Available', 'On Trip', 'In Shop', 'Out of Service'], 
      default: 'Available' 
    }
  }, { 
    timestamps: true 
  }
);

export default mongoose.models.Vehicle || mongoose.model<IVehicle>('Vehicle', VehicleSchema);