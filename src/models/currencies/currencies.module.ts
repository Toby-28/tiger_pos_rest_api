import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [CurrenciesController],
  providers: [CurrenciesService],
  imports: [PrismaModule, HttpModule],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}
