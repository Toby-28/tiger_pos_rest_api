import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CasesService } from './cases.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { FindAllCasesDTO } from './dto/find-all-cases.dto';
import { FindOneCaseDTO } from './dto/find-one-case.dto';

@ApiTags('Cases')
@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Post()
  create(@Body() body: CreateCaseDto) {
    return this.casesService.create(body);
  }

  @Get()
  findAll(@Query() query: FindAllCasesDTO) {
    return this.casesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: FindOneCaseDTO) {
    return this.casesService.findOne(+id, query);
  }
}
