import { ApiProperty } from '@nestjs/swagger';

export class FindOneItemUnitDTO {
  @ApiProperty({ enum: ['id', 'id_'] })
  type: string;

  @ApiProperty({ required: false, isArray: true, enum: ['Item', 'Unit'] })
  include: string[];
}
