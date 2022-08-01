import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryItemsDTO } from './dto/query-items.dto';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() body: CreateItemDto) {
    return this.itemsService.create(body);
  }

  @Get()
  findAll(@Param() params: QueryItemsDTO) {
    return this.itemsService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }
}
