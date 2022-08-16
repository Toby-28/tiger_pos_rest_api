import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SalesService {
  constructor(private readonly httpService: HttpService) {}

  create(body: CreateSaleDto) {
    return;
  }
}
