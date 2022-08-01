import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { QueryItemsDTO } from './dto/query-items.dto';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateItemDto) {
    return this.prisma.items.create({
      data,
    });
  }

  findAll(params: QueryItemsDTO) {
    let take = params.take ? +params.take : 10;
    let skip = params.skip ? +params.skip : 0;

    return this.prisma.items.findMany({ take: take, skip: skip });
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }
}
