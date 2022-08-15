import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { LogsService } from 'src/logs/logs.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { FindAllCasesDTO } from './dto/find-all-cases.dto';
import { FindOneCaseDTO } from './dto/find-one-case.dto';

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
  delete modified.id;

  return modified;
}

@Injectable()
export class CasesService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly logService: LogsService,
  ) {}
 
  async sync() {
    try {
      const response = await this.httpService.axiosRef.get(
        `${process.env.url}/api/v2/cases`,
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
          await this.prisma.cases.upsert({
            where: { id_: data.id_ },
            update: data,
            create: data,
          });
        } catch (error) {
          await this.logService.create({
            log: error.toString(),
            type: 'pos',
            entity: 'cases',
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
  }

  create(data: CreateCaseDto) {
    return;
  }

  findAll(query: FindAllCasesDTO) {
    let skip = query.skip ? +query.skip : 0;
    let take = query.take ? +query.take : 10;
    let include = checkIncludes(query.include);

    return this.prisma.cases.findMany({ skip, take, include });
  }

  findOne(id: number, query: FindOneCaseDTO) {
    let include = checkIncludes(query.include);

    return this.prisma.cases.findMany({ where: { id }, include });
  }
}
