import { Module } from '@nestjs/common';
import { DivisionsService } from './divisions.service';
import { DivisionsController } from './divisions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [DivisionsController],
  providers: [DivisionsService],
  imports: [PrismaModule, HttpModule],
  exports: [DivisionsService],
})
export class DivisionsModule {}
