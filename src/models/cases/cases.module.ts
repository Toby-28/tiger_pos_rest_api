import { Module } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  controllers: [CasesController],
  providers: [CasesService],
  imports: [PrismaModule, HttpModule, LogsModule],
  exports: [CasesService],
})
export class CasesModule {}
