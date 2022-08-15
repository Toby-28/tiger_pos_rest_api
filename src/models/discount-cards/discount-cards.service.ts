import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { LogsService } from 'src/logs/logs.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllDiscountCardsDTO } from './dto/find-all-discound-cards.dto';

const findAllDiscountCardsType = [
  'buyDiscount',
  'salesDiscount',
  'purchaseCost',
  'salesCost',
];

// Custom Functions
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
export class DiscountCardsService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly logService: LogsService,
  ) {}

  async sync() {
    try {
      const response = await this.httpService.axiosRef.get(
        `${process.env.url}/api/v2/discountCards`,
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
          await this.prisma.discountCards.upsert({
            where: { id_: data.id_ },
            update: data,
            create: data,
          });
        } catch (error) {
          await this.logService.create({
            log: error.toString(),
            type: 'pos',
            entity: 'discount_cards',
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

  findAll(query: FindAllDiscountCardsDTO) {
    let skip = query.skip ? +query.skip : 0;
    let take = query.take ? +query.take : 10;
    let type = query.type
      ? findAllDiscountCardsType.findIndex((type) => type === query.type) + 1
      : undefined;
    let where = { type };

    return this.prisma.discountCards.findMany({ skip, take, where });
  }

  findOne(id: number) {
    return this.prisma.discountCards.findUnique({ where: { id } });
  }
}
