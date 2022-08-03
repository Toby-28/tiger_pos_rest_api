import { ApiProperty } from '@nestjs/swagger';

export class FindOneDiscountCardDTO {
  @ApiProperty({
    enum: ['id', 'code'],
    description: 'By which type you want to fetch data?',
  })
  type: string;
}
