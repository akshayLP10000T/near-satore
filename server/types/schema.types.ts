import mongoose, { Model } from "mongoose";

// User Model
export interface UserType {
  email: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string | null;
  };
  cart: any[];
}

export interface UserTypeDocument extends mongoose.Document, UserType {
  generateJWT: () => string;
  isValidPassword: (password: string) => Promise<boolean>;
}

export interface UserTypeModel extends Model<UserTypeDocument> {
  hashPassword: (password: string) => Promise<string>;
}