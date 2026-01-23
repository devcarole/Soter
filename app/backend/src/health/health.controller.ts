import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RequestWithRequestId } from '../middleware/request-correlation.middleware';
import { HealthService } from './health.service';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Check system health' })
  @ApiResponse({ status: 200, description: 'System is healthy' })
  check(@Req() req: RequestWithRequestId) {
    // Access the request ID from the request object
    const requestId = req.requestId;

    // Log with request correlation
    this.healthService.logHealthCheck(requestId);

    return this.healthService.check();
  }

  @Get('error')
  @ApiOperation({ summary: 'Trigger an error for testing' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  triggerError(@Req() req: RequestWithRequestId) {
    const requestId = req.requestId;

    // Log the error attempt
    this.healthService.logErrorAttempt(requestId);

    // Throw an error to test exception handling
    throw new Error('This is a test error for logging demonstration');
  }
}
