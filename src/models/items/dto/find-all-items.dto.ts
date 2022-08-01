import { ApiProperty } from '@nestjs/swagger';
import { ItemIncludeEnum } from '../enums/ItemIncludeEnum';
import { OrderByEnum } from '../enums/OrderByEnum';

export class FindAllItemsDTO {
  @ApiProperty({ required: false })
  skip: number;

  @ApiProperty({ required: false, default: 10 })
  take: number;

  @ApiProperty({ required: false, enum: OrderByEnum })
  orderBy: string;

  @ApiProperty({ required: false, enum: ['asc', 'desc'] })
  orderType: string;

  @ApiProperty({ required: false, enum: ItemIncludeEnum })
  include: string[];
}
