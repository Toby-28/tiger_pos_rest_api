import { Module } from '@nestjs/common';
import { ItemUnitsService } from './item-units.service';
import { ItemUnitsController } from './item-units.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [PrismaModule, HttpModule, LogsModule],
  controllers: [ItemUnitsController],
  providers: [ItemUnitsService],
  exports: [ItemUnitsService],
})
export class ItemUnitsModule {}
