import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { LogsService } from 'src/logs/logs.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllUnitSetsDTO } from './dto/find-all-unit-sets.dto';
import { FindOneUnitSetDTO } from './dto/find-one-unit-set.dto';

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
export class UnitSetsService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly logService: LogsService,
  ) {}

  async sync() {
    try {
      const response = await this.httpService.axiosRef.get(
        `${process.env.url}/api/v2/unitSets`,
        {
          auth: {
            username: process.env.username,
            password: process.env.password,
          },
        },
      );

      console.log(response.data.length);

      for (let data of response.data) {
        data = modifyInputData(data);

        try {
          await this.prisma.unitSets.upsert({
            where: { code: data.code },
            update: data,
            create: data,
          });
        } catch (error) {
          await this.logService.create({
            log: error.toString(),
            type: 'error',
            entity: 'unit_sets',
          });
        }
      }
    } catch (error) {
      console.log(error.toString());
    }
  }

  findAll(query: FindAllUnitSetsDTO) {
    let skip = query.skip ? +query.skip : 0;
    let take = query.take ? +query.take : 10;

    return this.prisma.unitSets.findMany({ skip, take });
  }

  findOne(id: any, query: FindOneUnitSetDTO) {
    let where = query.type === 'id' ? { id: +id } : { code: id };

    return this.prisma.unitSets.findUnique({ where });
  }
}
