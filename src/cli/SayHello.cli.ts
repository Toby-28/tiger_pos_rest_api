import { Command, CommandRunner, Option } from 'nest-commander';

@Command({
  name: 'sayHello',
  description: 'Say hello with given Name',
  options: { isDefault: true },
})
export class SayHelloCommand extends CommandRunner {
  async run(
    passedParams: string[],
    options?: { name: string; age: number },
  ): Promise<void> {
    options.age < 13
      ? console.log(`Hello ${options.name}, you're still rather young!`)
      : options.age > 12 && options.age < 50
      ? console.log(`Hello ${options.name}, you're in the prime of your life!`)
      : console.log(
          `Hello ${options.name}, getting up there in age, huh? 
          Well, you're only as young as you feel!`,
        );
  }

  @Option({ flags: '-n <personName>' })
  parseName(val: string) {
    return val;
  }

  @Option({ flags: '-a <age>' })
  parseAge(val: number) {
    return val;
  }
}
