import { ApiProperty } from '@nestjs/swagger';

export class FindOneCurrencyDTO {
  @ApiProperty({ enum: ['id', 'code'] })
  type: string;
}
