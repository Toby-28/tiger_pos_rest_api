import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  controllers: [CurrenciesController],
  providers: [CurrenciesService],
  imports: [PrismaModule, HttpModule, LogsModule],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}
