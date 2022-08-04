import { ApiProperty } from '@nestjs/swagger';

export class FindAllPricesDTO {
  @ApiProperty({ required: false })
  skip: number;

  @ApiProperty({ required: false, default: 10 })
  take: number;

  @ApiProperty({
    required: false,
    enum: ['sale', 'actualtSale', 'purchase', 'lastPurchase'],
  })
  type: string;

  @ApiProperty({
    required: false,
    enum: ['Currencies', 'Items', 'Units'],
    isArray: true,
  })
  include: string[];
}
