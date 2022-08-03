import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { FindAllClientsDTO } from './dto/find-all-clients.dto';
import { FindOneClentDTO } from './dto/find-one-client.dto';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  findAll(@Query() query: FindAllClientsDTO) {
    return this.clientsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: FindOneClentDTO) {
    return this.clientsService.findOne(id, query);
  }
}
