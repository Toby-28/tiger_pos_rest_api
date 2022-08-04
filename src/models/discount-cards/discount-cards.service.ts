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

@Injectable()
export class DiscountCardsService {
  constructor(private prisma: PrismaService) {}

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
