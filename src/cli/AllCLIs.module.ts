import { Module } from '@nestjs/common';
import { BrandsCLIModule } from 'src/models/brands/cli/brand.cli.module';

@Module({ imports: [BrandsCLIModule] })
export class AllCLIsModule {}
