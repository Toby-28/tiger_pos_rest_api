import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { BrandsService } from './models/brands/brands.service';
import { ClientsService } from './models/clients/clients.service';
import { CurrenciesService } from './models/currencies/currencies.service';
import { DiscountCardsService } from './models/discount-cards/discount-cards.service';
import { DivisionsService } from './models/divisions/divisions.service';

@ApiTags('Sync')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly brands: BrandsService,
    private readonly divisions: DivisionsService,
    private readonly currencies: CurrenciesService,
    private readonly clients: ClientsService,
    private readonly discountCards: DiscountCardsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('sync')
  async sync() {
    await this.brands.sync();
    console.log(`Brands >------------------------------------\n`);

    await this.divisions.sync();
    console.log(`Divisions >---------------------------------\n`);

    await this.currencies.sync();
    console.log(`Currencies >--------------------------------\n`);

    // await this.clients.sync();
    console.log(`Clients >-----------------------------------\n`);

    await this.discountCards.sync();
    console.log(`DiscountCards >-----------------------------\n`);

    return;
  }
}
