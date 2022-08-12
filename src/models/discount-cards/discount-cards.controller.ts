import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DiscountCardsService } from './discount-cards.service';
import { FindAllDiscountCardsDTO } from './dto/find-all-discound-cards.dto';

@ApiTags('DiscountCards')
@Controller('discountCards')
export class DiscountCardsController {
  constructor(private readonly discountCardsService: DiscountCardsService) {}

  @Get()
  findAll(@Query() query: FindAllDiscountCardsDTO) {
    return this.discountCardsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountCardsService.findOne(+id);
  }
}
