import { Module } from '@nestjs/common';
import { DiscountCardsService } from './discount-cards.service';
import { DiscountCardsController } from './discount-cards.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  controllers: [DiscountCardsController],
  providers: [DiscountCardsService],
  imports: [PrismaModule, HttpModule, LogsModule],
  exports: [DiscountCardsService],
})
export class DiscountCardsModule {}
