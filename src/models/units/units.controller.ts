import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindAllUnitsDTO } from './dto/find-all-units.dto';
import { FindOneUnitDTO } from './dto/find-one-unit.dto';
import { UnitsService } from './units.service';

@ApiTags('Units')
@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Get()
  findAll(@Query() query: FindAllUnitsDTO) {
    return this.unitsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: FindOneUnitDTO) {
    return this.unitsService.findOne(id, query);
  }
}
