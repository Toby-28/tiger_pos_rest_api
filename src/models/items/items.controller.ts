import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ApiTags } from '@nestjs/swagger';
import { FindAllItemsDTO } from './dto/find-all-items.dto';
import { FindOneQueryDTO } from './dto/find-one-query.dto';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() body: CreateItemDto) {
    return this.itemsService.create(body);
  }

  @Get()
  findAll(@Query() query: FindAllItemsDTO) {
    return this.itemsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: FindOneQueryDTO) {
    return this.itemsService.findOne(id, query);
  }
}
