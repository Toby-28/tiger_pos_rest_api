import { Module } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  controllers: [PricesController],
  providers: [PricesService],
  imports: [PrismaModule, HttpModule, LogsModule],
  exports: [PricesService],
})
export class PricesModule {}
