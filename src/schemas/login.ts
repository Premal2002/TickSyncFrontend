import {z} from 'zod'

export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(8,'Password must be of minimum 8 characters long'),
  })

  export type LoginSchemaType = z.infer<typeof loginSchema>;