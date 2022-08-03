import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrenciesService } from './currencies.service';
import { FindAllCurrenciesDTO } from './dto/find-all-currencies.dto';
import { FindOneCurrencyDTO } from './dto/find-one-currency.dto';

@ApiTags('Currencies')
@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get()
  findAll(@Query() query: FindAllCurrenciesDTO) {
    return this.currenciesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: FindOneCurrencyDTO) {
    return this.currenciesService.findOne(id, query);
  }
}
