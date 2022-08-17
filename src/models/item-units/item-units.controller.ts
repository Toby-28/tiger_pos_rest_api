import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindAllItemUnitsDTO } from './dto/find-all-item-units.dto';
import { FindOneItemUnitDTO } from './dto/find-one-item-unit.dto';
import { ItemUnitsService } from './item-units.service';

@ApiTags('ItemUnits')
@Controller('item-units')
export class ItemUnitsController {
  constructor(private readonly itemUnitsService: ItemUnitsService) {}

  @Get()
  findAll(@Query() query: FindAllItemUnitsDTO) {
    return this.itemUnitsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: FindOneItemUnitDTO) {
    return this.itemUnitsService.findOne(+id, query);
  }
}
