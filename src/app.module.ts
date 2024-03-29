import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BarcodesModule } from './models/barcodes/barcodes.module';
import { ItemsModule } from './models/items/items.module';
import { BrandsModule } from './models/brands/brands.module';
import { CasesModule } from './models/cases/cases.module';
import { DivisionsModule } from './models/divisions/divisions.module';
import { CurrenciesModule } from './models/currencies/currencies.module';
import { ClientsModule } from './models/clients/clients.module';
import { DiscountCardsModule } from './models/discount-cards/discount-cards.module';
import { PricesModule } from './models/prices/prices.module';
import { UnitsModule } from './models/units/units.module';
import { UnitSetsModule } from './models/units/unit-sets/unit-sets.module';
import { TaskService } from './schedule/schedule.service';
import { SalesModule } from './models/sales/sales.module';
import { ItemUnitsModule } from './models/item-units/item-units.module';

@Module({
  imports: [
    BarcodesModule,
    ItemsModule,
    BrandsModule,
    CasesModule,
    DivisionsModule,
    CurrenciesModule,
    ClientsModule,
    DiscountCardsModule,
    PricesModule,
    UnitsModule,
    UnitSetsModule,
    SalesModule,
    ScheduleModule.forRoot(),
    ItemUnitsModule,
  ],
  controllers: [AppController],
  providers: [AppService, TaskService],
})
export class AppModule {}
