const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your name"],
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
      trim: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        "Please enter vaild email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a Password"],
      minLength: [6, "Password min-length is 6 Characters"],
      //maxLength: [15, "Password not more than 15 Characters"],
    },
    photo: {
      type: String,
      // required: [true, "Please add a photo"],
      default: "https://images.app.goo.gl/Kk6pRbjDcd2CC2CT7",
    },
    phone: {
      type: Number,
      // required: [true, "Please add your phone number"],
      default: +91,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
