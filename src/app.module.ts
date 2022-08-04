import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticleModule } from './models/article/article.module';
import { BarcodesModule } from './models/barcodes/barcodes.module';
import { ItemsModule } from './models/items/items.module';
import { BrandsModule } from './models/brands/brands.module';
import { CasesModule } from './models/cases/cases.module';
import { DivisionsModule } from './models/divisions/divisions.module';
import { CurrenciesModule } from './models/currencies/currencies.module';
import { ClientsModule } from './models/clients/clients.module';
import { DiscountCardsModule } from './models/discount-cards/discount-cards.module';
import { PricesModule } from './models/prices/prices.module';

@Module({
  imports: [
    PrismaModule,
    // ArticleModule,
    BarcodesModule,
    ItemsModule,
    BrandsModule,
    CasesModule,
    DivisionsModule,
    CurrenciesModule,
    ClientsModule,
    DiscountCardsModule,
    PricesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
