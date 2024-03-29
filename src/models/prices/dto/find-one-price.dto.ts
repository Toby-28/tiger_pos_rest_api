import { ApiProperty } from '@nestjs/swagger';

export class FindOnePriceDTO {
  @ApiProperty({ enum: ['id'] })
  type: string;

  @ApiProperty({
    required: false,
    enum: ['Currencies', 'Items', 'Units'],
    isArray: true,
  })
  include: string[];
}
