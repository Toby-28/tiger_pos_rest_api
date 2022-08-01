import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { BarcodesService } from './barcodes.service';
import { FindAllBarcodeDTO } from './dto/find-all-barcode.dto';
import { FindOneBarcodeDTO } from './dto/find-one-barcode.dto';
import { CreateBarcodeDto } from './dto/create-barcode.dto';

@Controller('barcodes')
@ApiTags('Barcodes')
export class BarcodesController {
  constructor(private readonly barcodesService: BarcodesService) {}

  @Post()
  create(@Body() body: CreateBarcodeDto) {
    return this.barcodesService.create(body);
  }

  @Get()
  findAll(@Query() query: FindAllBarcodeDTO) {
    return this.barcodesService.findAll(query);
  }

  // @ApiQuery({ type: FindOneBarcodeDTO })
  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: FindOneBarcodeDTO) {
    return this.barcodesService.findOne(+id, query);
  }
}
