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
    if (key !== 'createdAt' && key !== 'updatedAt') {
      modified = { ...modified, [key]: data[key] };
    }
  });

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
            where: { code: data.code },
            update: data,
            create: data,
          });
        } catch (error) {
          await this.logService.create({
            log: error,
            type: 'error',
            entity: 'cases',
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  create(body: CreateCaseDto) {
    return this.prisma.cases.create({ data: body });
  }

  findAll(query: FindAllCasesDTO) {
    let skip = query.skip ? +query.skip : 0;
    let take = query.take ? +query.take : 10;
    let include = checkIncludes(query.include);

    return this.prisma.cases.findMany({ skip, take });
  }

  findOne(id: any, query: FindOneCaseDTO) {
    id = query.type !== 'code' ? +id : id;
    let where = query.type === 'id' ? { id: id } : { code: id };
    let include = checkIncludes(query.include);

    return this.prisma.cases.findMany({ where });
  }
}
