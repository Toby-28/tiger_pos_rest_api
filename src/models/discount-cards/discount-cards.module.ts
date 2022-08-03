import { Module } from '@nestjs/common';
import { DiscountCardsService } from './discount-cards.service';
import { DiscountCardsController } from './discount-cards.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [DiscountCardsController],
  providers: [DiscountCardsService],
  imports: [PrismaModule],
})
export class DiscountCardsModule {}
