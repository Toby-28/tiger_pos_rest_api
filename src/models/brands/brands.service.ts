import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Brands } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllQueryDTO } from './dto/find-all-query.dto';

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
export class BrandsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async sync() {
    const response = await this.httpService.axiosRef.get(
      `${process.env.url}/api/v2/brands`,
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
        await this.prisma.brands.upsert({
          where: { code: data.code },
          update: data,
          create: data,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  findAll(query: FindAllQueryDTO) {
    let skip = query.skip ? +query.skip : 0;
    let take = query.take ? +query.take : 10;

    return this.prisma.brands.findMany({
      take,
      skip,
    });
  }

  findOne(id: number) {
    return this.prisma.brands.findUnique({ where: { id } });
  }
}
