import mongoose, { Schema, Document } from 'mongoose';

export interface IDriver extends Document {
  name: string;
  licenseNumber: string;
  licenseExpiry: Date;
  status: 'Available' | 'On Trip' | 'Off Duty' | 'Suspended';
  safetyScore: number;
}

const DriverSchema: Schema = new Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    licenseNumber: { 
      type: String, 
      required: true, 
      unique: true 
    },
    licenseExpiry: { 
      type: Date, 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['Available', 'On Trip', 'Off Duty', 'Suspended'], 
      default: 'Available' 
    },
    safetyScore: { 
      type: Number, 
      default: 100 
    }
  }, { 
    timestamps: true 
  }
);

export default mongoose.models.Driver || mongoose.model<IDriver>('Driver', DriverSchema);