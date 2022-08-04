import { ApiProperty } from '@nestjs/swagger';

export class FindAllUnitsDTO {
  @ApiProperty({ required: false })
  skip: number;

  @ApiProperty({ required: false, default: 10 })
  take: number;

  @ApiProperty({ required: false, enum: ['UnitSets'], isArray: true })
  include: string[];
}
