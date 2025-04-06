/* eslint-disable @typescript-eslint/no-require-imports */
const { Schema, mongoose } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    require: [true, "Please provide a name"],
    unique: false,
  },
  email: {
    type: String,
    require: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Please provide a password"],
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
