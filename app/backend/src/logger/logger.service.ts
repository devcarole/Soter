import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import pino from 'pino';

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger: pino.Logger;

  constructor() {
    this.logger = pino({
      level: process.env.LOG_LEVEL || 'info',
      timestamp: pino.stdTimeFunctions.isoTime,
      formatters: {
        level: label => ({ level: label }),
      },
    });
  }

  /**
   * Log a message with context
   */
  log(message: string, context?: string, meta?: Record<string, any>) {
    this.logger.info({ context, ...meta }, message);
  }

  /**
   * Log an error message
   */
  error(
    message: string,
    trace?: string,
    context?: string,
    meta?: Record<string, any>,
  ) {
    this.logger.error({ context, trace, ...meta }, message);
  }

  /**
   * Log a warning message
   */
  warn(message: string, context?: string, meta?: Record<string, any>) {
    this.logger.warn({ context, ...meta }, message);
  }

  /**
   * Log a debug message
   */
  debug(message: string, context?: string, meta?: Record<string, any>) {
    this.logger.debug({ context, ...meta }, message);
  }

  /**
   * Log a verbose message
   */
  verbose(message: string, context?: string, meta?: Record<string, any>) {
    this.logger.trace({ context, ...meta }, message);
  }

  /**
   * Get the underlying Pino logger instance
   */
  getLogger(): pino.Logger {
    return this.logger;
  }
}
