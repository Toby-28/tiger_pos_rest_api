import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticleModule } from './models/article/article.module';
import { BarcodesModule } from './models/barcodes/barcodes.module';
import { ItemsModule } from './models/items/items.module';
import { BrandsModule } from './models/brands/brands.module';

@Module({
  imports: [
    PrismaModule,
    ArticleModule,
    BarcodesModule,
    ItemsModule,
    BrandsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
