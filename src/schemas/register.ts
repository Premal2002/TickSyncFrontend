import {z} from 'zod'

export const registerSchema = z.object({
    fullname: z.string().min(3, { message: 'Name must be at least 3 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.string()
    .regex(/^[7-9][0-9]{9}$/, { message: "Enter a valid 10-digit phone number starting with 7, 8, or 9." }),

  password: z.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "Password must be at least 8 characters long and contain an uppercase letter, lowercase letter, number, and special character.",
    }),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

  export type RegisterSchemaType = z.infer<typeof registerSchema>;