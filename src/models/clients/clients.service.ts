import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllClientsDTO } from './dto/find-all-clients.dto';
import { FindOneClentDTO } from './dto/find-one-client.dto';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  findAll(query: FindAllClientsDTO) {
    let skip = query.skip ? +query.skip : 0;
    let take = query.take ? +query.take : 10;

    return this.prisma.clients.findMany({ skip, take });
  }

  findOne(id: any, query: FindOneClentDTO) {
    id = query.type === 'id' ? +id : id;

    return this.prisma.clients.findUnique({
      where: query.type === 'id' ? { id: id } : { code: id },
    });
  }
}
