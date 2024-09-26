import User from "../../models/userModel.js";
import { generateToken } from "../../config/generateToken.js";
import { sendSuccess } from "../../utils/responseHandler.js";
import {
  AuthenticationError,
  BadRequestError,
  DuplicateDataError,
} from "../../utils/appErrors.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const Users = await User.findAll();
    if (Users.username === username) {
      return new DuplicateDataError("User already exists");
    }

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    return sendSuccess(res, user, "User registered successfully");
  } catch (error) {
    throw new BadRequestError("Registration failed");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }); // this is mongodb, need to change the function
  if (user && (await user.matchPassword(password))) {
    const data = {
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    };
    return sendSuccess(res, data, "Login successfully");
  } else {
    throw new AuthenticationError("Invalid email or password");
  }
};

export { registerUser, loginUser };
