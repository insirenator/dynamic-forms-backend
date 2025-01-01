import { z } from "zod";

const appVars = {
    env: process.env.NODE_ENV || "development",
    host: process.env.APP_HOST || "127.0.0.1",
    port: parseInt(process.env.APP_PORT || "") || 8080,
    db: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT || ""),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
    }
}

const AppVarsSchema = z.object({
    env: z.enum(["development", "staging", "production"]),
    host: z.string(),
    port: z.number(),
    db: z.object({
        host: z.string(),
        port: z.number(),
        user: z.string(),
        password: z.string(),
    })
});

export function validateEnvironmentVariables() {
    const result = AppVarsSchema.safeParse(appVars);

    if (result.success) {
        return console.info("Environment variables are set properly.");
    }

    const missing: string[] = [];

    result.error.issues.forEach(issue => {
        switch (issue.path.join(".")) {
            case "env": missing.push("NODE_ENV"); return;
            case "db.host": missing.push("DATABASE_HOST"); return;
            case "db.port": missing.push("DATABASE_PORT"); return;
            case "db.user": missing.push("DATABASE_USER"); return;
            case "db.password": missing.push("DATABASE_PASSWORD"); return;
        }
    })

    throw new Error("Missing following environment variables: " + missing.join());
}

export default appVars;
