import mongoose, { Schema, Document } from "mongoose";

interface IBooking extends Document {
  service: string;
  date: Date;
  time: string;
  user: mongoose.Types.ObjectId;
  status: string; // "pending" or "confirmed" or "cancelled"
  createdAt: Date;
  updatedAt: Date;
}

// Schema
const bookingSchema = new Schema<IBooking>(
  {
    service: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Link Booking with user
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true, // Auto Generate [ createdAt - updatedAt ]
  }
);

// Create Model
// Check if [models.Booking] exists  || if not then create new model
const Booking =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;
