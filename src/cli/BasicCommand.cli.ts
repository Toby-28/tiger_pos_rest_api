import { Logger } from '@nestjs/common';
import { Command, CommandRunner, Option } from 'nest-commander';

interface BasicCommandOptions {
  string?: string;
  boolean?: boolean;
  number?: number;
}

@Command({
  name: 'basic',
  description: 'A parameter parse',
  options: { isDefault: true },
})
export class BasicCommand extends CommandRunner {
  constructor(private readonly logService: Logger) {
    super();
  }

  async run(
    passedParams: string[],
    options?: BasicCommandOptions,
  ): Promise<void> {
    options?.boolean !== undefined && options?.boolean === null
      ? this.runWithBoolean(passedParams, options.boolean)
      : options?.number
      ? this.runWithNumber(passedParams, options.number)
      : options?.string
      ? this.runWithString(passedParams, options.string)
      : this.runWithNone(passedParams);
  }

  @Option({ flags: '-s, --string [string]', description: 'A string return' })
  parseString(val: string): string {
    return val;
  }

  @Option({
    flags: '-n, --number [number]',
    description: 'A basic number parser',
  })
  parseNumber(val: number): number {
    return Number(val);
  }

  @Option({ flags: '-b, --boolean [boolean]', description: 'A boolean parser' })
  parseBoolean(val: string): boolean {
    return JSON.parse(val);
  }

  runWithString(param: string[], option: string): void {
    this.logService.log({ param, string: option });
  }

  runWithNumber(param: string[], option: number): void {
    this.logService.log({ param, number: option });
  }

  runWithBoolean(param: string[], option: boolean): void {
    this.logService.log({ param, boolean: option });
  }

  runWithNone(param: string[]): void {
    this.logService.log({ param });
  }
}
