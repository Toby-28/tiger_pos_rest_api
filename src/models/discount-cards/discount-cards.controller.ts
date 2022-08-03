import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DiscountCardsService } from './discount-cards.service';
import { FindAllDiscountCardsDTO } from './dto/find-all-discound-cards.dto';
import { FindOneDiscountCardDTO } from './dto/find-one-discount-card.dto';

@ApiTags('DiscountCards')
@Controller('discount-cards')
export class DiscountCardsController {
  constructor(private readonly discountCardsService: DiscountCardsService) {}

  @Get()
  findAll(@Query() query: FindAllDiscountCardsDTO) {
    return this.discountCardsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: FindOneDiscountCardDTO) {
    return this.discountCardsService.findOne(id, query);
  }
}
