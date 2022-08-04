import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllPricesDTO } from './dto/find-all-prices.dto';
import { FindOnePriceDTO } from './dto/find-one-price.dto';

// Custom Values
const FindAllPricesTypes = ['sale', 'actualtSale', 'purchase', 'lastPurchase'];

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
export class PricesService {
  constructor(private prisma: PrismaService) {}

  findAll(query: FindAllPricesDTO) {
    let skip = query.skip ? +query.skip : 0;
    let take = query.take ? +query.take : 10;
    let type = query.type
      ? FindAllPricesTypes.findIndex((type) => {
          type === query.type;
        })
      : undefined;
    let include = checkInclude(query.include);

    return this.prisma.prices.findMany({
      skip,
      take,
      where: type ? { type: type + 1 } : undefined,
      include,
    });
  }

  findOne(id: any, query: FindOnePriceDTO) {
    let where = query.type === 'id' ? { id: +id } : { code: id };
    let include = checkInclude(query.include);

    return this.prisma.prices.findUnique({ where, include });
  }
}
