import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minLength: 2,
    maxLength: 50,
    unique: [true, "Username already taken"],
  },
  email: {
    type: String,
    minLength: 6,
    trim: true,
    required: [true, "Email is required"],
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value
        );
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password must be at least 8 characters"],
  },
});

// Hash the user password before saving
UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password") || this.isNew) {
      const salt = await bcrypt.genSalt(10);

      // toString() gets rid of TypeScript error 'await' has no effect on this type of expression
      this.password = await bcrypt.hash(this.password.toString(), salt);
    }
    next();
  } catch (err) {
    next(err);
  }
});

// Compare user password to hash
// UserSchema.methods.comparePassword = async function (password) {
//   try {
//     const isValid = await bcrypt.compare(password, this.password);
//     if (!isValid) {
//       throw new Error("Password not valid");
//     }
//     return isValid;
//   } catch (err) {
//     throw err;
//   }
// };

const User = mongoose.model("User", UserSchema);

export default User;
