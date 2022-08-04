import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllUnitSetsDTO } from './dto/find-all-unit-sets.dto';
import { FindOneUnitSetDTO } from './dto/find-one-unit-set.dto';

@Injectable()
export class UnitSetsService {
  constructor(private prisma: PrismaService) {}

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
