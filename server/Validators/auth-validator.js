const { z } = require("zod");

// creating an object schema for validation
const logInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at lest 3 chars." })
    .max(255, { message: "Email must not be more than 255 chars." }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(7, { message: "Password must be at lest 7 chars." })
    .max(1024, { message: "Password must not be more than 1024 chars." }),
});

const signupSchema = logInSchema.extend({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at lest 3 chars." })
    .max(255, { message: "Name must not be more than 255 chars." }),

  dob: z
    .string({ required_error: "Name is required" }),
    
});

module.exports = { signupSchema, logInSchema };
