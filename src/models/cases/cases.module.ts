import { Module } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CasesController],
  providers: [CasesService],
  imports: [PrismaModule],
})
export class CasesModule {}
