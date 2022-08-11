import { Module } from '@nestjs/common';
import { DivisionsService } from './divisions.service';
import { DivisionsController } from './divisions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  controllers: [DivisionsController],
  providers: [DivisionsService],
  imports: [PrismaModule, HttpModule, LogsModule],
  exports: [DivisionsService],
})
export class DivisionsModule {}
