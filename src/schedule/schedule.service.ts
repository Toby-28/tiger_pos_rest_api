import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AppService } from 'src/app.service';

@Injectable()
export class TaskService {
  private readonly logService = new Logger(TaskService.name);

  constructor(private readonly appService: AppService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    await this.appService.sync();
    console.log(`\n
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    |   Syncronization successfully executed!!!   |
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    \n`);
  }
}
