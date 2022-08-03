import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllCurrenciesDTO } from './dto/find-all-currencies.dto';
import { FindOneCurrencyDTO } from './dto/find-one-currency.dto';

@Injectable()
export class CurrenciesService {
  constructor(private prisma: PrismaService) {}

  findAll(query: FindAllCurrenciesDTO) {
    let skip = query.skip ? +query.skip : 0;
    let take = query.take ? +query.take : 10;

    return this.prisma.currencies.findMany({ skip, take });
  }

  findOne(id: any, query: FindOneCurrencyDTO) {
    let where = query.type === 'id' ? { id: +id } : { code: id };
    
    return this.prisma.currencies.findUnique({ where });
  }
}
