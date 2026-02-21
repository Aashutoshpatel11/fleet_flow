import mongoose, { Schema, Document } from 'mongoose';

export interface IExpense extends Document {
  vehicleId: mongoose.Types.ObjectId;
  tripId?: mongoose.Types.ObjectId;
  type: 'Fuel' | 'Maintenance';
  amount: number;
  date: Date;
  description: string;
  litersLogged?: number;
}

const ExpenseSchema: Schema = new Schema(
  {
    vehicleId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Vehicle', 
      required: true 
    },
    tripId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Trip' 
    },
    type: { 
      type: String, 
      enum: ['Fuel', 'Maintenance'], 
      required: true 
    },
    amount: { 
      type: Number, 
      required: true 
    },
    date: { 
      type: Date, 
      required: true, 
      default: Date.now 
    },
    description: { 
      type: String, 
      required: true 
    },
    litersLogged: { 
      type: Number 
    } 
  }, { 
    timestamps: true 
  }
);

export default mongoose.models.Expense || mongoose.model<IExpense>('Expense', ExpenseSchema);