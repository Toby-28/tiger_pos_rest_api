import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DivisionsService } from './divisions.service';
import { FindAllDivisionsDTO } from './dto/find-all-divisions.dto';
import { FindOneDivisionDTO } from './dto/find-one-division.dto';

@ApiTags('Divisions')
@Controller('divisions')
export class DivisionsController {
  constructor(private readonly divisionsService: DivisionsService) {}

  @Get()
  findAll(@Query() query: FindAllDivisionsDTO) {
    return this.divisionsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: FindOneDivisionDTO) {
    return this.divisionsService.findOne(+id, query);
  }
}
