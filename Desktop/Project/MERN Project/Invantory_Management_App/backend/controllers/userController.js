const User = require("..//models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//REGISTER ROUTE
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  //required field validation
  if (!name || !email || !password) {
    console.log("please enter name email and password");
  }

  //user exist or not
  const userExist = await User.findOne({ email });
  if (userExist) {
    console.log("User already exist");
  }

  //encypt passowrd before save to DB
  const salt = await bcrypt.genSalt(10);
  const hassedPassword = await bcrypt.hash(password, salt);

  //create user
  const createUser = await User.create({
    name,
    email,
    password: hassedPassword,
  });

  //generate token
  const token = generateToken(createUser._id);

  //send http cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 864000), //1day
    sameSite: "none",
    secure: true,
  });

  if (createUser) {
    const { _id, name, email, password, photo, phone } = createUser;
    res.status(201).json({
      _id,
      name,
      email,
      password,
      photo,
      phone,
      token,
    });
  } else {
    console.log("Invalid user data");
  }
};

//LOGIN ROUTE
const loginUser = async (req, res) => {

  const { email, password } = req.body;
  if (!email || !password) {
    console.log("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    console.log("User not available please Signup");
  }
  //Password Validation
  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  if (user && passwordIsCorrect) {
    const { _id, name, email, password, photo, phone } = user;
    res.status(200).json({
      _id,
      name,
      email,
      password,
      photo,
      phone,
    });
  } else {
    console.log("please enter email or password Correct");
  }
};

module.exports = {
  registerUser,
  loginUser,
};
