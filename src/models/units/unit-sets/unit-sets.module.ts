import { Module } from '@nestjs/common';
import { UnitSetsService } from './unit-sets.service';
import { UnitSetsController } from './unit-sets.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  controllers: [UnitSetsController],
  providers: [UnitSetsService],
  imports: [PrismaModule, HttpModule, LogsModule],
  exports: [UnitSetsService],
})
export class UnitSetsModule {}
