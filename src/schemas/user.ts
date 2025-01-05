import { z } from 'zod';

export const UserSchema = z.object({
    username: z.string({ required_error: "'username' is required" }) .trim()
        .min(3, { message: "'username' must be atleast 3 characters long" })
        .max(30, { message: "'username' must not exceed 30 characters" }),

    email: z.string({ required_error: "'email' is required" })
        .email({ message: "'email' must be valid" }),

    password: z.string({ required_error: "'password' is required" })
        .min(8, { message: "'password' must be atleast 8 characters long" })
})
