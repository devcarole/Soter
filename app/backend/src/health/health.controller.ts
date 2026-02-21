import { Controller, Get, Version } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthService } from './health.service';
import { API_VERSIONS } from '../common/constants/api-version.constants';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @Version(API_VERSIONS.V1)
  @ApiOperation({
    summary: 'Check system health',
    description: 'Returns the current health status of the API. Part of v1 API.',
  })
  @ApiResponse({
    status: 200,
    description: 'System is healthy',
    schema: {
      example: {
        status: 'healthy',
        version: 'v1',
        timestamp: '2025-01-23T10:00:00.000Z',
      },
    },
  })
  check() {
    return this.healthService.check();
  }
}
