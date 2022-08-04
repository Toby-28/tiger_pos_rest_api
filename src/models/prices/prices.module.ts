import { Module } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PricesController],
  providers: [PricesService],
  imports: [PrismaModule],
})
export class PricesModule {}
