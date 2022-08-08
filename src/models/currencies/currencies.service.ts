import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Currencies } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllCurrenciesDTO } from './dto/find-all-currencies.dto';
import { FindOneCurrencyDTO } from './dto/find-one-currency.dto';

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
export class CurrenciesService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async sync() {
    const response = await this.httpService.axiosRef.get(
      `${process.env.url}/api/v2/currencies`,
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
        await this.prisma.currencies.upsert({
          where: { code: data.code },
          update: data,
          create: data,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

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
