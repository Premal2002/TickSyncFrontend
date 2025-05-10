import { z } from "zod";

export const forgotpasswordSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});

export type ForgotPasswordSchemaType = z.infer<typeof forgotpasswordSchema>;

export const verifyOtpSchema = z.object({
    otp: z
        .string()
        .length(6, { message: "OTP must be a 6-digit number" })
});

export type VerifyOtpSchemaType = z.infer<typeof verifyOtpSchema>;

export const resetPasswordSchema = z.object({
    password: z
        .string()
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            {
                message:
                    "Password must be at least 8 characters long and contain an uppercase letter, lowercase letter, number, and special character.",
            }
        ),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
