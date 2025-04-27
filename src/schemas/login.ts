import {z} from 'zod'

export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(8,'Invalid Password'),
  })

  export type LoginSchemaType = z.infer<typeof loginSchema>;