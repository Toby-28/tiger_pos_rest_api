import { Module } from '@nestjs/common';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  controllers: [UnitsController],
  providers: [UnitsService],
  imports: [PrismaModule, HttpModule, LogsModule],
  exports: [UnitsService],
})
export class UnitsModule {}
