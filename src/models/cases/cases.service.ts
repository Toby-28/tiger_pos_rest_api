import { Injectable } from '@nestjs/common';
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

@Injectable()
export class CasesService {
  constructor(private prisma: PrismaService) {}

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
