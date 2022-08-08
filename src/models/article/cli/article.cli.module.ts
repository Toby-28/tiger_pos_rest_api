import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ArticleCLI } from './article.cli';

@Module({
  providers: [ArticleCLI],
  imports: [HttpModule],
})
export class ArticleCLIModule {}
