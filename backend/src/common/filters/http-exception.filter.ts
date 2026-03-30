import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = this.extractMessage(exception);

    response.status(statusCode).json({
      message,
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private extractMessage(exception: unknown): string | string[] {
    if (!(exception instanceof HttpException)) {
      return 'Internal server error';
    }

    const response = exception.getResponse();
    if (typeof response === 'string') {
      return response;
    }

    if (typeof response === 'object' && response !== null && 'message' in response) {
      const message = (response as { message?: string | string[] }).message;
      if (message) {
        return message;
      }
    }

    return exception.message;
  }
}
