import { Controller, Get } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(
    @InjectQueue('verification') private verificationQueue: Queue,
    @InjectQueue('notifications') private notificationsQueue: Queue,
    @InjectQueue('onchain') private onchainQueue: Queue,
  ) {}

  @ApiOperation({ summary: 'Get status of all background job queues' })
  @Get('status')
  async getStatus() {
    return {
      verification: await this.getQueueStatus(this.verificationQueue),
      notifications: await this.getQueueStatus(this.notificationsQueue),
      onchain: await this.getQueueStatus(this.onchainQueue),
    };
  }

  private async getQueueStatus(queue: Queue) {
    const [waiting, active, completed, failed, delayed] = await Promise.all([
      queue.getWaitingCount(),
      queue.getActiveCount(),
      queue.getCompletedCount(),
      queue.getFailedCount(),
      queue.getDelayedCount(),
    ]);

    return {
      name: queue.name,
      waiting,
      active,
      completed,
      failed,
      delayed,
    };
  }
}
