import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "at least 8 characters").max(100).regex(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  "Password must contain uppercase, lowercase, number and special character"
),
  })
  
  export type LoginSchemaType = z.infer<typeof loginSchema>;