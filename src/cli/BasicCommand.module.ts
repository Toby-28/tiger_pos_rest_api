import { Logger, Module } from '@nestjs/common';
import { BasicCommand } from './BasicCommand.cli';

@Module({
  providers: [BasicCommand, Logger],
  exports: [BasicCommand],
})
export class BasicCommandModule {}
