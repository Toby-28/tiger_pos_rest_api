import { Module } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { TaskService } from './schedule.service';

@Module({
  imports: [AppModule],
  providers: [TaskService],
})
export class TaskModule {}
