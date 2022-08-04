import { Module } from '@nestjs/common';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UnitsController],
  providers: [UnitsService],
  imports: [PrismaModule],
})
export class UnitsModule {}
