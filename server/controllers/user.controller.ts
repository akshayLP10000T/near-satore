import { Request, Response } from "express";
import User from "../schema/user.model";
import { createUser, findUserByEmail } from "../services/user.service";

declare global {
  namespace Express {
    interface Request {
      userEmail: string | null;
    }
  }
}

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, password, confirmPassword, fullName } = req.body;

    if (!email || !password || !fullName) {
      return res.status(404).json({
        message: "Some error occured, check all fiels",
      });
    }

    if (!(password.toString().trim() === confirmPassword.toString().trim())) {
      return res.status(400).json({
        message: "Confirm password is not same",
      });
    }

    const userExisted = await User.findOne({ email: req.body.email });

    if (userExisted) {
      return res.status(401).json({
        message: "E-mail already taken",
      });
    }

    const user = await createUser(req.body);

    const token = user.generateJWT();

    res.cookie("token", token);

    return res.status(201).json({
      user,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error, try again later",
    });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        message: "Check all fiels",
      });
    }

    let user = await User.findOne({ email }).select("password email");

    if (!user) {
      return res.status(401).json({
        message: "E-mail or password is incorrect",
      });
    }

    const isPassMatch = await user.isValidPassword(password);

    if (!isPassMatch) {
      return res.status(401).json({
        message: "E-mail or password is incorrect",
      });
    }

    user = await User.findOne({ email });

    const token = user?.generateJWT();

    res.cookie("token", token);

    return res.status(200).json({
      user,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const userProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user = await findUserByEmail(req.userEmail!);
    if (user) return res.status(200).json({ user });
    return res.status(401).json({
      message: "Some error occured",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logout = async (_: Request, res: Response): Promise<any> => {
  try {
    res.cookie("token", "");
    return res.status(202).json({
      message: "Logged out successfully",
    });
  } catch (error: any) {
    console.log(error);
  }
};
