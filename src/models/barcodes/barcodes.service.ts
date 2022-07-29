import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBarcodeDto } from './dto/create-barcode.dto';
import { UpdateBarcodeDto } from './dto/update-barcode.dto';
import { QueryBarcodeDTO } from './dto/query-barcode.dto';

@Injectable()
export class BarcodesService {
  constructor(private prisma: PrismaService) {}

  create(createBarcodeDto: CreateBarcodeDto) {
    return 'This action adds a new barcode';
  }

  findAll(params: QueryBarcodeDTO) {
    let take = params.take ? parseInt(params.take.toString()) : 10;
    let skip = params.skip ? parseInt(params.skip.toString()) : 0;
    // let include = params.include ?

    return this.prisma.barcodes.findMany({
      skip: skip,
      take: take,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} barcode`;
  }

  update(id: number, updateBarcodeDto: UpdateBarcodeDto) {
    return `This action updates a #${id} barcode`;
  }

  remove(id: number) {
    return `This action removes a #${id} barcode`;
  }
}
