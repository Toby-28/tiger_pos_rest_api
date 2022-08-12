import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { LogsService } from 'src/logs/logs.service';
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
export class PricesService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly logService: LogsService,
  ) {}

  async sync() {
    try {
      const response = await this.httpService.axiosRef.get(
        `${process.env.url}/api/v2/prices`,
        {
          auth: {
            username: process.env.username,
            password: process.env.password,
          },
          params: {
            limit: 10000,
          },
        },
      );

      console.log(response.data.length);

      for (let data of response.data) {
        data = modifyInputData(data);

        try {
          await this.prisma.prices.upsert({
            where: { id_: data.id_ },
            update: data,
            create: data,
          });
        } catch (error) {
          await this.logService.create({
            log: error.toString(),
            type: 'pos',
            entity: 'prices',
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

  findOne(id: number, query: FindOnePriceDTO) {
    let include = checkInclude(query.include);

    return this.prisma.prices.findUnique({ where: { id }, include });
  }
}
