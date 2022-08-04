import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindAllPricesDTO } from './dto/find-all-prices.dto';
import { FindOnePriceDTO } from './dto/find-one-price.dto';
import { PricesService } from './prices.service';

@ApiTags('Prices')
@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Get()
  findAll(@Query() query: FindAllPricesDTO) {
    return this.pricesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: FindOnePriceDTO) {
    return this.pricesService.findOne(id, query);
  }
}
