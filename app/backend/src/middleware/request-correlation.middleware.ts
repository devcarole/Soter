import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

// Extend the Express Request interface to include requestId
export interface RequestWithRequestId extends Request {
  requestId?: string;
}

@Injectable()
export class RequestCorrelationMiddleware implements NestMiddleware {
  use(req: RequestWithRequestId, res: Response, next: NextFunction) {
    // Generate a unique request ID
    const requestId = randomUUID();

    // Attach the request ID to the request object
    req.requestId = requestId;

    // Also set it in response headers for client-side tracking
    res.setHeader('X-Request-ID', requestId);

    next();
  }
}
