import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllBarcodeDTO } from './dto/find-all-barcode.dto';
import { FindOneBarcodeDTO } from './dto/find-one-barcode.dto';
import { CreateBarcodeDto } from './dto/create-barcode.dto';
import { HttpService } from '@nestjs/axios';
import { LogsService } from 'src/logs/logs.service';

// Custom Functions
function checkIncludes(queryInclude) {
  let include;
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
export class BarcodesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly logService: LogsService,
  ) {}

  async sync() {
    try {
      const response = await this.httpService.axiosRef.get(
        `${process.env.url}/api/v2/barcodes`,
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
          await this.prisma.barcodes.upsert({
            where: { id_: data.id_ },
            update: data,
            create: data,
          });
        } catch (error) {
          await this.logService.create({
            log: error.toString(),
            type: 'pos',
            entity: 'barcodes',
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

  create(data: CreateBarcodeDto) {
    return this.prisma.barcodes.create({
      data,
    });
  }

  findAll(query: FindAllBarcodeDTO) {
    let take = query.take ? +query.take : 10;
    let skip = query.skip ? +query.skip : 0;

    let include = checkIncludes(query.include);

    return this.prisma.barcodes.findMany({
      skip,
      take,
      include,
    });
  }

  findOne(id: any, query: FindOneBarcodeDTO) {
    id = query.type === 'id' ? +id : id;

    let include = checkIncludes(query.include);

    return this.prisma.barcodes.findUnique({
      where: { [query.type]: id },
      include,
    });
  }
}
