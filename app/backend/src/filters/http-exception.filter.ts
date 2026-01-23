import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RequestWithRequestId } from '../middleware/request-correlation.middleware';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<RequestWithRequestId>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const requestId = request.requestId;

    const exceptionError = exception as Error;

    // Log the error with request correlation
    this.logger.error(
      `HTTP Exception: ${status}`,
      exceptionError instanceof Error ? exceptionError.stack : undefined,
      'HttpExceptionFilter',
      {
        requestId,
        method: request.method,
        url: request.url,
        status,
        userAgent: request.get('user-agent'),
        ip: request.ip,
      },
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      requestId,
      message,
    });
  }
}
