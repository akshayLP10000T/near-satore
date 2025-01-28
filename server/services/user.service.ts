import User from "../schema/user.model";
import { CreateUserData } from "../types/forms.types";
import { UserTypeDocument } from "../types/schema.types";

export const createUser = async (
  data: CreateUserData
): Promise<UserTypeDocument> => {
  const { email, password, fullName } = data;

  if (!email || !password || !fullName) {
    throw new Error("All details are necessary for creating a user");
  }

  const hashedPassword = await User.hashPassword(password);

  let user = await User.create({
    email,
    password: hashedPassword,
    fullName,
  });

  const userWithoutPassword = await User.findById(user._id);

  return userWithoutPassword!;
};

export const findUserByEmail = async (email: string) : Promise<UserTypeDocument | null> => {
  const user = await User.findOne({ email });

  if(!user){
    return null;
  }

  return user;
};
