import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrenciesService } from './currencies.service';
import { FindAllCurrenciesDTO } from './dto/find-all-currencies.dto';

@ApiTags('Currencies')
@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get()
  findAll(@Query() query: FindAllCurrenciesDTO) {
    return this.currenciesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.currenciesService.findOne(+id);
  }
}
