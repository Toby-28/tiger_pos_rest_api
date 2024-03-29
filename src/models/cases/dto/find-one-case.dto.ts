import { ApiProperty } from '@nestjs/swagger';

export class FindOneCaseDTO {
  @ApiProperty({ enum: ['id', 'divisionNr'] })
  type: string;

  @ApiProperty({
    required: false,
    enum: ['divisionNr', 'currencyId'],
    isArray: true,
  })
  include: string[];
}
