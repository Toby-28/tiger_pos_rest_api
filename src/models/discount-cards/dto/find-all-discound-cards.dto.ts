import { ApiProperty } from '@nestjs/swagger';

export class FindAllDiscountCardsDTO {
  @ApiProperty({ required: false })
  skip: number;

  @ApiProperty({ required: false, default: 10 })
  take: number;

  @ApiProperty({
    required: false,
    enum: ['buyDiscount', 'salesDiscount', 'purchaseCost', 'salesCost'],
  })
  type: string;
}
