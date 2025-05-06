import { User } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "./JwtManager.js";
import Token from "../models/TokenModel.js";

const SALT = Number(process.env.SALT);

export async function saveUser({ name, email, password, gender }) {
  const salt = await bcrypt.genSalt(SALT);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = new User({
      name,
      email,
      password: hashedPassword,
      gender,
    });
    const unused = await user.save();
    return true;
  } catch (error) {
    console.log(`Failed to create user with email: ${email}`, error.message);
    return false;
  }
}

export async function authenticateUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    return { message: "Invalid user credentials", status: 400 };
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return { message: "Invalid password! please try again", status: 400 };
  }
  const token = generateToken(user);
  await upsertTokenForUser(user, token);
  return { message: "Signin success", token, status: 200 };
}

async function upsertTokenForUser(user, token) {
  const tokenInstance = await Token.findOne({ userId: user._id });
  if (tokenInstance) {
    await tokenInstance.deleteOne();
  }

  await Token.create(
    new Token({
      userId: user._id,
      token,
    })
  );
}
