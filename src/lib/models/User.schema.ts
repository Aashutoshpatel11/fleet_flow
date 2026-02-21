import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  role: 'Manager' | 'Dispatcher' | 'Safety Officer' | 'Financial Analyst';
  isActive: boolean;
}

const UserSchema: Schema = new Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    passwordHash: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      enum: ['Manager', 'Dispatcher', 'Safety Officer', 'Financial Analyst'], 
      required: true 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    }
  }, { 
    timestamps: true 
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);