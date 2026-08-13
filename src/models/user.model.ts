import { IUser } from "@/types/user.types";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, trim: true, required: [true, "Name is required"] },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Name is required"],
      minLength: [6, "Minimum 6 characters required"],
    },
    mobile: {
      type: String,
      minLength: [10, "Minimun 10 characters required"],
      maxLength: [10, "Maximum 10 characters required"],
    },
  },
  { timestamps: true },
);

userSchema.pre("save", function (): void {
  if (!this.isModified("password")) return;
  this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePass = function (candidatePassword: string): boolean {
  return bcrypt.compareSync(candidatePassword, this.password);
};

const userModel = mongoose.model("Users", userSchema);
export default userModel;
