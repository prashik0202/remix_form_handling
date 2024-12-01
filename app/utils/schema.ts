import { z } from "zod";

export const SignupSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(12, "Password should be at least 12 characters"),
  country: z.string().nonempty("Country is required"),
  state: z.string().nonempty("State is required"),
  city: z.string().nonempty("City is required"),
  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
});
