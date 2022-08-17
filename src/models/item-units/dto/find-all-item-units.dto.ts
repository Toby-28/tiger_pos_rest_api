import { ApiProperty } from '@nestjs/swagger';

export class FindAllItemUnitsDTO {
  @ApiProperty({ required: false })
  skip: number;

  @ApiProperty({ required: false, default: 10 })
  take: number;

  @ApiProperty({ required: false, enum: [] })
  orderBy: string;

  @ApiProperty({ required: false, enum: ['asc', 'desc'] })
  orderType: string;

  @ApiProperty({ required: false, enum: ['Item', 'Unit'], isArray: true })
  include: string[];
}
