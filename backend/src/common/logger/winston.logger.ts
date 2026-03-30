import { format, transports, createLogger } from 'winston';

export const winstonLogger = createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [new transports.Console()],
});

export const morganStream = {
  write: (message: string): void => {
    winstonLogger.http(message.trim());
  },
};
