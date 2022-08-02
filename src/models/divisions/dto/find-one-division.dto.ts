import { ApiProperty } from '@nestjs/swagger';

export class FindOneDivisionDTO {
  @ApiProperty({ enum: ['id', 'nr'] })
  type: string;

  @ApiProperty({ required: false, enum: ['Cases'] })
  include: string;
}
