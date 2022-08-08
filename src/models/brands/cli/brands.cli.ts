import { HttpService } from '@nestjs/axios';
import { Brands } from '@prisma/client';
import { Command, CommandRunner } from 'nest-commander';

@Command({
  name: 'brands',
  description: 'GET from Tiger, POST to POSCentral --> Brands',
})
export class BrandCLI extends CommandRunner {
  constructor(private readonly httpService: HttpService) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    try {
      const response = await this.httpService.axiosRef.get(
        `${process.env.url}/api/v2/brands`,
        {
          auth: {
            username: process.env.username,
            password: process.env.password,
          },
        },
      );

      console.log(response.data[0]);
      console.log(response.data.length);

      this.syncDataBase(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  syncDataBase(data: Brands[]) {
    
  }
}
