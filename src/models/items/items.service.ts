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
    if (key !== 'createdAt' && key !== 'updatedAt') {
      modified = { ...modified, [key]: data[key] };
    }
  });

  return modified;
}

@Injectable()
export class ItemsService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly logService: LogsService,
  ) {}

  async sync() {
    try {
      const response = await this.httpService.axiosRef.get(
        `${process.env.url}/api/v2/items`,
        {
          auth: {
            username: process.env.username,
            password: process.env.password,
          },
          params: {
            limit: 500,
          },
        },
      );

      console.log(response.data.length);

      for (let data of response.data) {
        data = modifyInputData(data);

        try {
          await this.prisma.items.upsert({
            where: { code: data.code },
            update: data,
            create: data,
          });
        } catch (error) {
          await this.logService.create({
            log: error.toString(),
            type: 'error',
            entity: 'items',
          });
        }
      }
    } catch (error) {
      console.log(error.toString());
    }
  }

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

  async findOne(id: any, query: FindOneQueryDTO) {
    id = query.type !== 'code' ? +id : id;

    let include = checkInclude(query.include);
    let where = {};
    let result = {};

    query.type !== 'barcode'
      ? ((where = query.type === 'id' ? { id: id } : { code: id.toString() }),
        (result = await this.prisma.items.findUnique({
          where: where,
          include,
        })))
      : (result = await this.prisma.barcodes.findUnique({
          where: { barcode: id.toString() },
          include: { Items: true },
        }));
    return result;
  }
}
