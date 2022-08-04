import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllUnitsDTO } from './dto/find-all-units.dto';
import { FindOneUnitDTO } from './dto/find-one-unit.dto';

// Custom Functions
function checkInclude(queryInclude) {
  let include = {};
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
export class UnitsService {
  constructor(private prisma: PrismaService) {}

  findAll(query: FindAllUnitsDTO) {
    let skip = query.skip ? +query.skip : 0;
    let take = query.take ? +query.take : 10;
    let include = checkInclude(query.include);

    return this.prisma.units.findMany({ skip, take, include });
  }

  findOne(id: any, query: FindOneUnitDTO) {
    let where = query.type === 'id' ? { id: +id } : { code: id };
    let include = checkInclude(query.include);

    return this.prisma.units.findUnique({ where, include });
  }
}
