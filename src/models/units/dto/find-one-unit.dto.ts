import { ApiProperty } from '@nestjs/swagger';

export class FindOneUnitDTO {
  @ApiProperty({ enum: ['id', 'code'] })
  type: string;

  @ApiProperty({ required: false, enum: ['UnitSets'], isArray: true })
  include: string[];
}
