import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { LogsService } from 'src/logs/logs.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { FindAllItemsDTO } from './dto/find-all-items.dto';
import { FindOneQueryDTO } from './dto/find-one-query.dto';

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
  delete modified.id;

  return modified;
}

@Injectable()
export class ItemsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly logService: LogsService,
  ) {}

  async sync(offset: number, limit: number): Promise<number> {
    let length: number;
    try {
      const response = await this.httpService.axiosRef.get(
        `${process.env.url}/api/v2/items`,
        {
          auth: {
            username: process.env.username,
            password: process.env.password,
          },
          params: { offset, limit },
        },
      );
      length = response.data.length;
      console.log(length);

      for (let data of response.data) {
        data = modifyInputData(data);

        try {
          await this.prisma.items.upsert({
            where: { id_: data.id_ },
            update: data,
            create: data,
          });
        } catch (error) {
          await this.logService.create({
            log: error.toString(),
            type: 'pos',
            entity: 'items',
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

    return length;
  }

  create(data: CreateItemDto) {
    return;
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

  async findOne(id: number, query: FindOneQueryDTO) {
    let include = checkInclude(query.include);
    let result = {};

    query.type !== 'barcode'
      ? (result = await this.prisma.items.findUnique({
          where: { id },
          include,
        }))
      : (result = await this.prisma.barcodes.findUnique({
          where: { barcode: id.toString() },
          include: { Items: true },
        }));
    return result;
  }
}
