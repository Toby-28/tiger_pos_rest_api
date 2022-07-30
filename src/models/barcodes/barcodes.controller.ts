import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { BarcodesService } from './barcodes.service';
import { CreateBarcodeDto } from './dto/create-barcode.dto';
import { UpdateBarcodeDto } from './dto/update-barcode.dto';
import { QueryBarcodeDTO } from './dto/query-barcode.dto';
import { FindOneBarcodeDTO } from './dto/find-one-barcode.dto';

@Controller('barcodes')
@ApiTags('Barcodes')
export class BarcodesController {
  constructor(private readonly barcodesService: BarcodesService) {}

  @Post()
  create(@Body() createBarcodeDto: CreateBarcodeDto) {
    return this.barcodesService.create(createBarcodeDto);
  }

  @Get()
  findAll(@Query() query: QueryBarcodeDTO) {
    return this.barcodesService.findAll(query);
  }

  // @ApiQuery({ type: FindOneBarcodeDTO })
  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: FindOneBarcodeDTO) {
    return this.barcodesService.findOne(+id, query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBarcodeDto: UpdateBarcodeDto) {
    return this.barcodesService.update(+id, updateBarcodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.barcodesService.remove(+id);
  }
}
