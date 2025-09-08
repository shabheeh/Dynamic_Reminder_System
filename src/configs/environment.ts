import dotenv from "dotenv";
dotenv.config();


interface Config {
    NODE_ENV: string;
    PORT: number;
    CORS_ORIGIN: string;
}

export const config: Config = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: parseInt(process.env.PORT || "3000"),
    CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
}  