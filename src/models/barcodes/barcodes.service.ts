import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBarcodeDto } from './dto/create-barcode.dto';
import { UpdateBarcodeDto } from './dto/update-barcode.dto';
import { QueryBarcodeDTO } from './dto/query-barcode.dto';
import { FindOneBarcodeDTO } from './dto/find-one-barcode.dto';

@Injectable()
export class BarcodesService {
  constructor(private prisma: PrismaService) {}

  create(createBarcodeDto: CreateBarcodeDto) {
    return 'This action adds a new barcode';
  }

  findAll(params: QueryBarcodeDTO) {
    let take = params.take ? +params.take : 10;
    let skip = params.skip ? +params.skip : 0;

    return this.prisma.barcodes.findMany({
      skip: skip,
      take: take,
    });
  }

  findOne(id: number, query: FindOneBarcodeDTO) {
    let where = query.type === 'id' ? { id: id } : { barcode: id.toString() };

    return this.prisma.barcodes.findUnique({ where: where });
  }

  update(id: number, updateBarcodeDto: UpdateBarcodeDto) {
    return `This action updates a #${id} barcode`;
  }

  remove(id: number) {
    return `This action removes a #${id} barcode`;
  }
}
