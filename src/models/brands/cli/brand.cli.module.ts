import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BrandCLI } from './brands.cli';

@Module({
  providers: [BrandCLI],
  imports: [HttpModule],
})
export class BrandsCLIModule {}
