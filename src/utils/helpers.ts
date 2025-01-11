import bcrypt from "bcrypt";
import { nanoid, customAlphabet } from "nanoid";
// ------- HASHER ----------------
export interface Hasher {
    hash: (text: string) => Promise<string>
    compare: (text: string, hash: string) => Promise<boolean>
}
export const hasher: Hasher = {
    async hash(text: string) {
        return bcrypt.hash(text, 10);
    },

    async compare(text: string, hash: string) {
        return bcrypt.compare(text, hash);
    }
}

// ------- TOKEN GENERATOR ---------
export interface TokenGenerator {
    generate: () => string
    generateShort: () => string
}

export const tokenGenerator: TokenGenerator = {
    // generates a lengthy id
    generate() {
        return nanoid(50);
    },

    generateShort() {
        const smalls = "abcdefghijklmnopqrstuvwxyz";
        const caps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const nums = "0123456789";

        return customAlphabet(smalls + caps + nums, 8)();
    }
}
