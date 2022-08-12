import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindAllUnitSetsDTO } from './dto/find-all-unit-sets.dto';
import { UnitSetsService } from './unit-sets.service';

@ApiTags('UnitSets')
@Controller('unitSets')
export class UnitSetsController {
  constructor(private readonly unitSetsService: UnitSetsService) {}

  @Get()
  findAll(@Query() query: FindAllUnitSetsDTO) {
    return this.unitSetsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param() id: string) {
    return this.unitSetsService.findOne(+id);
  }
}
