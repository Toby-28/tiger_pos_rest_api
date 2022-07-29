import { Module } from '@nestjs/common';
import { BarcodesService } from './barcodes.service';
import { BarcodesController } from './barcodes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [BarcodesController],
  providers: [BarcodesService],
  imports: [PrismaModule]
})
export class BarcodesModule {}
