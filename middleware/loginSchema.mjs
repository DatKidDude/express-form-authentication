import User from "../db/Users.mjs";
import bcrypt from "bcrypt";

const loginSchema = {
  username: {
    isLength: {
      bail: true,
      options: { min: 5, max: 50 },
      errorMessage: "Username must be between 5 and 50 characters",
    },
    isString: {
      bail: true,
      errorMessage: "Username must be a string",
    },
    custom: {
      options: async (value) => {
        try {
          const user = await User.where("username").equals(value);
          if (!user.length) {
            throw new Error("Username doesn't exist");
          }
          Promise.resolve();
        } catch (err) {
          return Promise.reject(err.message);
        }
      },
    },
  },
  password: {
    isLength: {
      bail: true,
      options: { min: 8 },
      errorMessage: "Password must be at least 8 characters",
    },
    custom: {
      options: async (value, { req: { body } }) => {
        try {
          const [user] = await User.where("username").equals(body.username);

          // validator chains don't know about errors generated from other validator chains. If the username doesn't exist exit the function.
          if (user === undefined) {
            return;
          }
          const isValid = await bcrypt.compare(value, user.password);
          if (!isValid) {
            throw new Error("Passwords do not match");
          }
          return Promise.resolve();
        } catch (err) {
          return Promise.reject(err.message);
        }
      },
    },
  },
};

export { loginSchema };
