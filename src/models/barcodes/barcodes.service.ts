import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllBarcodeDTO } from './dto/find-all-barcode.dto';
import { FindOneBarcodeDTO } from './dto/find-one-barcode.dto';
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
  delete modified.id;

  return modified;
}

@Injectable()
export class BarcodesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly logService: LogsService,
  ) {}

  async sync(offset: number, limit: number): Promise<number> {
    let length: number;
    try {
      const response = await this.httpService.axiosRef.get(
        `${process.env.url}/api/v2/barcodes`,
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
