import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { FindAllItemsDTO } from './dto/find-all-items.dto';

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
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateItemDto) {
    return this.prisma.items.create({
      data,
    });
  }

  findAll(query: FindAllItemsDTO) {
    console.log(query);

    let take = query.take ? +query.take : 10;
    let skip = query.skip ? +query.skip : 0;
    let orderBy = query.orderBy
      ? query.orderType
        ? { [query.orderBy]: query.orderType }
        : { [query.orderBy]: 'asc' }
      : [];
    let include = checkInclude(query.include);

    return this.prisma.items.findMany({
      take,
      skip,
      orderBy,
      include,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }
}
