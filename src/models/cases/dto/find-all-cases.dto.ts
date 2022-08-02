import { ApiProperty } from '@nestjs/swagger';

export class FindAllCasesDTO {
  @ApiProperty({ required: false })
  skip: number;

  @ApiProperty({ required: false, default: 10 })
  take: number;

  @ApiProperty({
    required: false,
    enum: ['divisionNr', 'currencyId'],
    isArray: true,
  })
  include: string[];
}
