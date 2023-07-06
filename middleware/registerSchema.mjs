import User from "../db/Users.mjs";

const registrationSchema = {
  username: {
    isLength: {
      options: { min: 5, max: 50 },
      errorMessage: "Username must be between 5 and 50 characters",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
    custom: {
      options: async (value) => {
        // const user = await User.find({ username: value });
        const user = await User.where("username").equals(value);
        if (user.length > 0) {
          return Promise.reject("Username already taken");
        }
      },
    },
  },
  email: {
    isLength: {
      options: { min: 6 },
      errorMessage: "Email must be at least 6 characters",
    },
    isEmail: { errorMessage: "Please provide a valid email" },
    normalizeEmail: true,
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must be at least 8 characters",
    },
  },
};

export { registrationSchema };
