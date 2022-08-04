import { Module } from '@nestjs/common';
import { UnitSetsService } from './unit-sets.service';
import { UnitSetsController } from './unit-sets.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UnitSetsController],
  providers: [UnitSetsService],
  imports: [PrismaModule],
})
export class UnitSetsModule {}
