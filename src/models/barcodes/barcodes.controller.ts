import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BarcodesService } from './barcodes.service';
import { FindAllBarcodeDTO } from './dto/find-all-barcode.dto';
import { FindOneBarcodeDTO } from './dto/find-one-barcode.dto';

@Controller('barcodes')
@ApiTags('Barcodes')
export class BarcodesController {
  constructor(private readonly barcodesService: BarcodesService) {}

  @Get()
  findAll(@Query() query: FindAllBarcodeDTO) {
    return this.barcodesService.findAll(query);
  }

  // @ApiQuery({ type: FindOneBarcodeDTO })
  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: FindOneBarcodeDTO) {
    return this.barcodesService.findOne(id, query);
  }
}
