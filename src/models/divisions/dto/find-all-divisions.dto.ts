import { ApiProperty } from '@nestjs/swagger';

export class FindAllDivisionsDTO {
  @ApiProperty({ required: false })
  skip: number;

  @ApiProperty({ required: false, default: 10 })
  take: number;

  @ApiProperty({ required: false, enum: ['cases'], isArray: true })
  include: string[];
}
