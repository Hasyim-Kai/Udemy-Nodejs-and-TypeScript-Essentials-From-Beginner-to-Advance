import { createLogger, format, transports } from "winston";

export const infoLogger: any = createLogger({
  format: format.json(),
  transports: [
    new transports.File({
      level: 'info',
      filename: './logs/infoLogs.log',
    }),
    new transports.File({
      level: "error",
      filename: "logs/error.log",
    }),
  ],
})

export const infoLoggerStream = {
  write: (message: any) => infoLogger.info(message),
}