import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
import fs from "fs";
import { config } from "./environment";

const logDir = "logs";

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);

const transports: winston.transport[] = [
  new winston.transports.Console({
    level: config.NODE_ENV === "development" ? "debug" : "info",
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({ format: "HH:mm:ss" }),
      winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}]: ${message}`;
      })
    ),
    handleExceptions: true,
  }),

  new DailyRotateFile({
    filename: path.join(logDir, "app-%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    maxSize: "20m",
    maxFiles: "14d",
    level: "info",
    format: logFormat,
  }),

  new DailyRotateFile({
    filename: path.join(logDir, "error-%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    maxSize: "20m",
    maxFiles: "14d",
    level: "error",
    format: logFormat,
    handleExceptions: true,
  }),
];

const logger = winston.createLogger({
  level: config.NODE_ENV === "development" ? "debug" : "info",
  format: logFormat,
  transports,
  exitOnError: false,
});


export default logger;
