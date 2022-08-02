import { ApiProperty } from '@nestjs/swagger';

export class CreateCaseDto {
  @ApiProperty({})
  code: string;

  @ApiProperty({})
  name: string;

  @ApiProperty({ required: false })
  address: string;

  @ApiProperty({ required: false })
  address2: string;

  @ApiProperty({ required: false })
  divisionNr: number;

  @ApiProperty({})
  currencyId: number;

  @ApiProperty({ default: true })
  active: boolean;
}
