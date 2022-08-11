import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [PrismaModule, HttpModule, LogsModule],
  exports: [ClientsService],
})
export class ClientsModule {}
