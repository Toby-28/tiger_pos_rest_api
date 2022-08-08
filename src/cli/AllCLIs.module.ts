import { Module } from '@nestjs/common';
import { ArticleCLIModule } from 'src/models/article/cli/article.cli.module';
import { BrandsCLIModule } from 'src/models/brands/cli/brand.cli.module';

@Module({ imports: [ArticleCLIModule, BrandsCLIModule] })
export class AllCLIsModule {}
