import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllQueryDTO } from './dto/find-all-query.dto';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  findAll(query: FindAllQueryDTO) {
    let skip = query.skip ? +query.skip : 0;
    let take = query.take ? +query.take : 10;

    return this.prisma.brands.findMany({
      take,
      skip,
    });
  }

  findOne(id: number) {
    return this.prisma.brands.findUnique({ where: { id } });
  }
}
