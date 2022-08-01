import { ApiProperty } from '@nestjs/swagger';

export class QueryItemsDTO {
  @ApiProperty({ required: false })
  skip?: number;

  @ApiProperty({ required: false, default: 10 })
  take?: number;

  @ApiProperty({ required: false })
  orderName?: string;

  @ApiProperty({ required: false, enum: ['asc', 'desc'] })
  orderType?: string;

  @ApiProperty({ required: false })
  include?: string[];
}
