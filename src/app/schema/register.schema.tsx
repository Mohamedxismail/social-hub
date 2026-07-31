import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, "Min length is 3 characters").max(30, "Max length is 30 characters"),
    username: z.string().min(3, "Min length is 3 characters").max(30, "Max length is 30 characters").regex( /^[a-z0-9_]{3,30}$/,"Username can only contain lowercase letters, numbers, and underscore like _"),
    email: z.string().email("Invalid email address"),
    dateOfBirth: z.string().refine((date) => {
      const today = new Date();
      const birthDate = new Date(date);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age >= 13;
    }, {
      message: "You must be at least 13 years old",
    }),

    password: z.string().min(8, "at least 8 characters").max(100).regex(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  "Password must contain uppercase, lowercase, number and special character"
),

    rePassword: z.string(),

    gender: z.enum(["male", "female"], {
      message: "Please select gender",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });
  export type RegisterSchemaType = z.infer<typeof registerSchema>;