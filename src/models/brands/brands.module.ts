import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService],
  imports: [PrismaModule, HttpModule],
  exports: [BrandsService],
})
export class BrandsModule {}
