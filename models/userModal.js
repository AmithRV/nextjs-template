/* eslint-disable @typescript-eslint/no-require-imports */
const { Schema, mongoose } = require("mongoose");

const userSchema = new Schema({
  userid: {
    type: String,
    require: [true, "Please provide a userid"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Please provide a password"],
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
