import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [PrismaModule, HttpModule],
  exports: [ClientsService],
})
export class ClientsModule {}
