import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { LogsService } from 'src/logs/logs.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllClientsDTO } from './dto/find-all-clients.dto';

// Custom Functions
function modifyInputData(data) {
  let modified = undefined;

  Object.keys(data).forEach((key) => {
    if (key === 'id') {
      modified = { ...modified, ['id_']: data[key] };
    }
    if (key !== 'createdAt' && key !== 'updatedAt') {
      modified = { ...modified, [key]: data[key] };
    }
  });
  delete modified.id;

  return modified;
}

@Injectable()
export class ClientsService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly logService: LogsService,
  ) {}

  async sync(offset: number, limit: number): Promise<number> {
    let length: number;
    try {
      const response = await this.httpService.axiosRef.get(
        `${process.env.url}/api/v2/clients`,
        {
          auth: {
            username: process.env.username,
            password: process.env.password,
          },
          params: { offset, limit },
        },
      );
      length = response.data.length;
      console.log(length);

      for (let data of response.data) {
        data = modifyInputData(data);

        try {
          await this.prisma.clients.upsert({
            where: { id_: data.id_ },
            update: data,
            create: data,
          });
        } catch (error) {
          await this.logService.create({
            log: error.toString(),
            type: 'pos',
            entity: 'clients',
            row_id: data.id_,
          });
        }
      }
    } catch (error) {
      await this.logService.create({
        log: error.toString(),
        type: 'tiger',
        entity: 'brands',
      });
    }

    return length;
  }

  findAll(query: FindAllClientsDTO) {
    let skip = query.skip ? +query.skip : 0;
    let take = query.take ? +query.take : 10;

    return this.prisma.clients.findMany({ skip, take });
  }

  findOne(id: number) {
    return this.prisma.clients.findUnique({
      where: { id },
    });
  }
}
