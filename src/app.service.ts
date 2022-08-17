import { Injectable } from '@nestjs/common';
import { BarcodesService } from './models/barcodes/barcodes.service';
import { BrandsService } from './models/brands/brands.service';
import { CasesService } from './models/cases/cases.service';
import { ClientsService } from './models/clients/clients.service';
import { CurrenciesService } from './models/currencies/currencies.service';
import { DiscountCardsService } from './models/discount-cards/discount-cards.service';
import { DivisionsService } from './models/divisions/divisions.service';
import { ItemUnitsService } from './models/item-units/item-units.service';
import { ItemsService } from './models/items/items.service';
import { PricesService } from './models/prices/prices.service';
import { UnitSetsService } from './models/units/unit-sets/unit-sets.service';
import { UnitsService } from './models/units/units.service';

@Injectable()
export class AppService {
  constructor(
    private readonly brands: BrandsService,
    private readonly divisions: DivisionsService,
    private readonly currencies: CurrenciesService,
    private readonly clients: ClientsService,
    private readonly discountCards: DiscountCardsService,
    private readonly items: ItemsService,
    private readonly itemUnits: ItemUnitsService,
    private readonly unitSets: UnitSetsService,
    private readonly units: UnitsService,
    private readonly barcodes: BarcodesService,
    private readonly prices: PricesService,
    private readonly cases: CasesService,
  ) {}

  getHello(): string {
    return 'ХУШНУДБЕК зовут!';
  }

  async sync(): Promise<string> {
    console.log(new Date());

    let length: number;
    let offsetPagination: number;
    let limitPagination: number;

    console.log(`Brands >------------------------------------`);
    await this.brands.sync();

    console.log(`UnitSets >----------------------------------`);
    await this.unitSets.sync();

    console.log(`Units >-------------------------------------`);
    await this.units.sync();

    console.log(`Items >-------------------------------------`);
    length = 0;
    offsetPagination = 0;
    limitPagination = 10000;

    do {
      length = await this.items.sync(offsetPagination, limitPagination);
      offsetPagination += limitPagination;
    } while (length === limitPagination);

    console.log(`ItemUnits >---------------------------------`);
    length = 0;
    offsetPagination = 0;
    limitPagination = 10000;

    do {
      length = await this.itemUnits.sync(offsetPagination, limitPagination);
      offsetPagination += limitPagination;
    } while (length === limitPagination);

    console.log(`Barcodes >----------------------------------`);
    length = 0;
    offsetPagination = 0;
    limitPagination = 10000;

    do {
      length = await this.barcodes.sync(offsetPagination, limitPagination);
      offsetPagination += limitPagination;
    } while (length === limitPagination);

    console.log(`Divisions >---------------------------------`);
    await this.divisions.sync();

    console.log(`Currencies >--------------------------------`);
    await this.currencies.sync();

    console.log(`Prices >------------------------------------`);
    length = 0;
    offsetPagination = 0;
    limitPagination = 10000;

    do {
      length = await this.prices.sync(offsetPagination, limitPagination);
      offsetPagination += limitPagination;
    } while (length === limitPagination);

    console.log(`Cases >-------------------------------------`);
    await this.cases.sync();

    console.log(`Clients >-----------------------------------`);
    length = 0;
    offsetPagination = 0;
    limitPagination = 10000;

    do {
      length = await this.clients.sync(offsetPagination, limitPagination);
      offsetPagination += limitPagination;
    } while (length === limitPagination);

    console.log(`DiscountCards >-----------------------------`);
    await this.discountCards.sync();

    console.log(new Date());
    return 'Success!';
  }
}
