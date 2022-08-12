import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { BarcodesService } from './models/barcodes/barcodes.service';
import { BrandsService } from './models/brands/brands.service';
import { CasesService } from './models/cases/cases.service';
import { ClientsService } from './models/clients/clients.service';
import { CurrenciesService } from './models/currencies/currencies.service';
import { DiscountCardsService } from './models/discount-cards/discount-cards.service';
import { DivisionsService } from './models/divisions/divisions.service';
import { ItemsService } from './models/items/items.service';
import { PricesService } from './models/prices/prices.service';
import { UnitSetsService } from './models/units/unit-sets/unit-sets.service';
import { UnitsService } from './models/units/units.service';
import { PrismaService } from './prisma/prisma.service';

@ApiTags('sync')
@Controller()
export class AppController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly appService: AppService,
    private readonly brands: BrandsService,
    private readonly divisions: DivisionsService,
    private readonly currencies: CurrenciesService,
    private readonly clients: ClientsService,
    private readonly discountCards: DiscountCardsService,
    private readonly items: ItemsService,
    private readonly unitSets: UnitSetsService,
    private readonly units: UnitsService,
    private readonly barcodes: BarcodesService,
    private readonly prices: PricesService,
    private readonly cases: CasesService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('sync')
  async sync() {
    console.log(`Brands >------------------------------------`);
    await this.brands.sync();

    console.log(`UnitSets >----------------------------------`);
    await this.unitSets.sync();

    console.log(`Units >-------------------------------------`);
    await this.units.sync();

    console.log(`Items >-------------------------------------`);
    await this.items.sync();

    console.log(`Barcodes >----------------------------------`);
    await this.barcodes.sync();

    console.log(`Divisions >---------------------------------`);
    await this.divisions.sync();

    console.log(`Currencies >--------------------------------`);
    await this.currencies.sync();

    console.log(`Prices >------------------------------------`);
    await this.prices.sync();

    console.log(`Cases >-------------------------------------`);
    await this.cases.sync();

    console.log(`Clients >-----------------------------------`);
    await this.clients.sync();

    console.log(`DiscountCards >-----------------------------`);
    await this.discountCards.sync();

    return;
  }
}
