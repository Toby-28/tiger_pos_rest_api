import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllDiscountCardsDTO } from './dto/find-all-discound-cards.dto';
import { FindOneDiscountCardDTO } from './dto/find-one-discount-card.dto';

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
    if (key !== 'createdAt' && key !== 'updatedAt') {
      modified = { ...modified, [key]: data[key] };
    }
  });

  return modified;
}

@Injectable()
export class DiscountCardsService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async sync() {
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
          where: { code: data.code },
          update: data,
          create: data,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  findAll(query: FindAllDiscountCardsDTO) {
    let skip = query.skip ? +query.skip : 0;
    let take = query.take ? +query.take : 10;
    let type = findAllDiscountCardsType.findIndex(
      (type) => type === query.type,
    );
    let where = { type: type + 1 };

    return this.prisma.discountCards.findMany({ skip, take, where });
  }

  findOne(id: any, query: FindOneDiscountCardDTO) {
    id = query.type === 'id' ? +id : id;

    return this.prisma.discountCards.findUnique({
      where: query.type === 'id' ? { id: id } : { code: id },
    });
  }
}
