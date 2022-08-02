import { Module } from '@nestjs/common';
import { DivisionsService } from './divisions.service';
import { DivisionsController } from './divisions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [DivisionsController],
  providers: [DivisionsService],
  imports: [PrismaModule],
})
export class DivisionsModule {}
