import { ApiProperty } from '@nestjs/swagger';

export class FindOneUnitDTO {
  @ApiProperty({ required: false, enum: ['UnitSets'], isArray: true })
  include: string[];
}
