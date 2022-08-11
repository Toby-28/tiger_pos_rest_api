import { Module } from '@nestjs/common';
import { BarcodesService } from './barcodes.service';
import { BarcodesController } from './barcodes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  controllers: [BarcodesController],
  providers: [BarcodesService],
  imports: [PrismaModule, HttpModule, LogsModule],
  exports: [BarcodesService],
})
export class BarcodesModule {}
