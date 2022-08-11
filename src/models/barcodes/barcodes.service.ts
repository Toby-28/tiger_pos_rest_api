import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllBarcodeDTO } from './dto/find-all-barcode.dto';
import { FindOneBarcodeDTO } from './dto/find-one-barcode.dto';
import { CreateBarcodeDto } from './dto/create-barcode.dto';
import { HttpService } from '@nestjs/axios';
import { LogsService } from 'src/logs/logs.service';

// Custom Functions
function checkIncludes(queryInclude, include) {
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
        },
      );

      console.log(response.data.length);
      let countRecords = 0;

      for (let data of response.data) {
        countRecords++;
        if (countRecords > 1000) {
          break;
        }
        data = modifyInputData(data);

        try {
          await this.prisma.barcodes.upsert({
            where: { barcode: data.barcode },
            update: data,
            create: data,
          });
        } catch (error) {
          await this.logService.create({
            log: error,
            type: 'error',
            entity: 'barcodes',
          });
        }
      }
    } catch (error) {
      console.log(error);
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
    let include;

    include = checkIncludes(query.include, include);

    return this.prisma.barcodes.findMany({
      skip,
      take,
      include,
    });
  }

  findOne(id: number, query: FindOneBarcodeDTO) {
    let where = query.type === 'id' ? { id: id } : { barcode: id.toString() };
    let include;

    include = checkIncludes(query.include, include);

    return this.prisma.barcodes.findUnique({ where: where, include });
  }
}
