import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllBarcodeDTO } from './dto/find-all-barcode.dto';
import { FindOneBarcodeDTO } from './dto/find-one-barcode.dto';
import { CreateBarcodeDto } from './dto/create-barcode.dto';

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

@Injectable()
export class BarcodesService {
  constructor(private prisma: PrismaService) {}

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
