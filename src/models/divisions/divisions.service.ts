import { Injectable } from '@nestjs/common';
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

@Injectable()
export class DivisionsService {
  constructor(private prisma: PrismaService) {}

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
