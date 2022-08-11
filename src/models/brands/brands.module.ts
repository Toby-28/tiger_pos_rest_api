import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService],
  imports: [PrismaModule, HttpModule, LogsModule],
  exports: [BrandsService],
})
export class BrandsModule {}
