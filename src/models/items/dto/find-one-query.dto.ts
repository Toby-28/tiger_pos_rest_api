import { ApiProperty } from '@nestjs/swagger';
import { ItemIncludeEnum } from '../enums/ItemIncludeEnum';

export class FindOneQueryDTO {
  @ApiProperty({ enum: ['id', 'barcode'] })
  type: string;

  @ApiProperty({ required: false, isArray: true, enum: ItemIncludeEnum })
  include: string[];
}
