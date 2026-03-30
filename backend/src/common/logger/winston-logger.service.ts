import { Injectable, LoggerService } from '@nestjs/common';
import { winstonLogger } from './winston.logger';

@Injectable()
export class WinstonLoggerService implements LoggerService {
  log(message: string, context?: string): void {
    winstonLogger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string): void {
    winstonLogger.error(message, { context, trace });
  }

  warn(message: string, context?: string): void {
    winstonLogger.warn(message, { context });
  }

  debug(message: string, context?: string): void {
    winstonLogger.debug(message, { context });
  }

  verbose(message: string, context?: string): void {
    winstonLogger.verbose(message, { context });
  }
}
