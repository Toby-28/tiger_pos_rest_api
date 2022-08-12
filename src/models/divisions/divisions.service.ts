import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { LogsService } from 'src/logs/logs.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllDivisionsDTO } from './dto/find-all-divisions.dto';
import { FindOneDivisionDTO } from './dto/find-one-division.dto';

// Custom Functions
function checkIncludes(queryInclude) {
  let include;
  Array.isArray(queryInclude)
    ? queryInclude.forEach((key) => {
        include = { ...include, [key]: true };
      })
    : queryInclude
    ? (include = { [queryInclude]: true })
    : (include = undefined);

  return include;
}
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

  return modified;
}

@Injectable()
export class DivisionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly logService: LogsService,
  ) {}

  async sync() {
    try {
      const response = await this.httpService.axiosRef.get(
        `${process.env.url}/api/v2/divisions`,
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
          await this.prisma.divisions.upsert({
            where: { id_: data.id_ },
            update: data,
            create: data,
          });
        } catch (error) {
          await this.logService.create({
            log: error.toString(),
            type: 'pos',
            entity: 'divisions',
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
  }

  findAll(query: FindAllDivisionsDTO) {
    let skip = query.skip ? +query.skip : 0;
    let take = query.take ? +query.take : 10;
    let include = checkIncludes(query.include);

    return this.prisma.divisions.findMany({ skip, take, include });
  }

  findOne(id: number, query: FindOneDivisionDTO) {
    return this.prisma.divisions.findUnique({
      where: { [query.type]: id },
      include: query.include ? { Cases: true } : undefined,
    });
  }
}
