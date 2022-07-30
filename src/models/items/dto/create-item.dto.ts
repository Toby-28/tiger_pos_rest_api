import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({ required: false, default: 'passive' })
  status?: String;

  @ApiProperty({})
  code: String;

  @ApiProperty({ required: false })
  eCode?: String;

  @ApiProperty({ required: false, default: false })
  active?: Boolean;

  @ApiProperty({ required: false, default: false })
  eActive?: Boolean;

  @ApiProperty({})
  cardType: number;

  @ApiProperty({})
  name: String;

  @ApiProperty({ required: false })
  name2?: String;

  @ApiProperty({ required: false })
  name3?: String;

  @ApiProperty({ required: false })
  name4?: String;

  @ApiProperty({ required: false })
  specode1?: String;

  @ApiProperty({ required: false })
  specode2?: String;

  @ApiProperty({ required: false })
  specode3?: String;

  @ApiProperty({ required: false })
  specode4?: String;

  @ApiProperty({ required: false })
  specode5?: String;

  @ApiProperty({ required: false })
  keyword1?: String;

  @ApiProperty({ required: false })
  keyword2?: String;

  @ApiProperty({ required: false })
  keyword3?: String;

  @ApiProperty({ required: false })
  keyword4?: String;

  @ApiProperty({ required: false })
  keyword5?: String;

  @ApiProperty({ required: false })
  origin?: String;

  @ApiProperty({})
  category: String;

  @ApiProperty({})
  mainUnit: String;

  @ApiProperty({})
  mainUnitId: number;

  @ApiProperty({})
  brandId: number;

  @ApiProperty({ required: false })
  variationCode?: String;

  @ApiProperty({})
  reyonCode: String;

  @ApiProperty({})
  producerCode: String;

  @ApiProperty({})
  salesLimitQuantity: number;
}
