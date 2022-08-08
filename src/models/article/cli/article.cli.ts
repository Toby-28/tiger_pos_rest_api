import { HttpService } from '@nestjs/axios';
import { Command, CommandRunner } from 'nest-commander';

@Command({
  name: 'article',
  description: 'GET from Tiger, POST to POSCentral --> Article',
})
export class ArticleCLI extends CommandRunner {
  constructor(private readonly httpService: HttpService) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    try {
      const response = await this.httpService.axiosRef.get(
        `${process.env.url}/api/v2/barcodes`,
        {
          auth: {
            username: process.env.username,
            password: process.env.password,
          },
        },
      );
      
      console.log(response.data.length);
    } catch (error) {
      console.log(error);
    }
  }
}
