import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create User Schema
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      match: [/^\+?[0-9]{10,15}$/, "Invalid phone number"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "Invalid email address"],
    },
    password: {
      type: String,
      required: true,
      select: false, //  Hide password when fetching
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// create a pre-save hook to hash the password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// add a method to compare passwords
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Export the User model (prevent model overwrite in dev)
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
