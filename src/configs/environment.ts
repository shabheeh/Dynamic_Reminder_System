import dotenv from "dotenv";
dotenv.config();


interface Config {
    NODE_ENV: string;
    PORT: number;
    CORS_ORIGIN: string;
    REMINDER_CRON: string;
    TIMEZONE: string;
}

export const config: Config = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: parseInt(process.env.PORT || "3000"),
    CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
    REMINDER_CRON: process.env.REMINDER_CRON || "* * * * *",
    TIMEZONE: process.env.TIMEZONE || "Asia/Kolkata",
}  