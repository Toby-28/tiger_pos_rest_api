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

@Module({
  imports: [
    PrismaModule,
    ArticleModule,
    BarcodesModule,
    ItemsModule,
    BrandsModule,
    CasesModule,
    DivisionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
