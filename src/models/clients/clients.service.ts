import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Clients } from '@prisma/client';
import { LogsService } from 'src/logs/logs.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllClientsDTO } from './dto/find-all-clients.dto';
import { FindOneClentDTO } from './dto/find-one-client.dto';

// Custom Functions
function modifyInputData(data) {
  let modified = undefined;

  Object.keys(data).forEach((key) => {
    if (key !== 'createdAt' && key !== 'updatedAt') {
      modified = { ...modified, [key]: data[key] };
    }
  });

  return modified;
}

@Injectable()
export class ClientsService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly logService: LogsService,
  ) {}

  async sync() {
    try {
      const response = await this.httpService.axiosRef.get(
        `${process.env.url}/api/v2/clients`,
        {
          auth: {
            username: process.env.username,
            password: process.env.password,
          },
        },
      );

      console.log(response.data.length);
      let countRecords = 0;

      for (let data of response.data) {
        countRecords++;
        if (countRecords > 1000) {
          break;
        }
        data = modifyInputData(data);

        try {
          await this.prisma.clients.upsert({
            where: { code: data.code },
            update: data,
            create: data,
          });
        } catch (error) {
          await this.logService.create({
            log: error,
            type: 'error',
            entity: 'clients',
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

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
