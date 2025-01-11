import bcrypt from "bcrypt";

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
