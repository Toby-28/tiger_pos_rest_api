import { ApiProperty } from '@nestjs/swagger';
import { CartTypeEnums } from '../enums/CartTypeEnums';

export class CreateItemDto {
  @ApiProperty({ required: true })
  code: string;

  @ApiProperty({})
  eCode?: string;

  @ApiProperty({})
  producerCode?: string;

  @ApiProperty({})
  active?: boolean;

  @ApiProperty({ required: true, enum: CartTypeEnums })
  cardType: number;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({})
  name2?: string;

  @ApiProperty({})
  name3?: string;

  @ApiProperty({})
  name4?: string;

  @ApiProperty({})
  specode1?: string;

  @ApiProperty({})
  specode2?: string;

  @ApiProperty({})
  specode3?: string;

  @ApiProperty({})
  specode4?: string;

  @ApiProperty({})
  specode5?: string;

  @ApiProperty({})
  keyword1?: string;

  @ApiProperty({})
  keyword2?: string;

  @ApiProperty({})
  keyword3?: string;

  @ApiProperty({})
  keyword4?: string;

  @ApiProperty({})
  keyword5?: string;

  @ApiProperty({})
  origin?: string;

  @ApiProperty({})
  category?: string;

  @ApiProperty({ required: true })
  mainUnit: string;

  @ApiProperty({ required: true })
  mainUnitId: number;

  @ApiProperty({})
  brandId?: number;

  @ApiProperty({})
  variationCode?: string;

  @ApiProperty({})
  reyonCode?: string;

  @ApiProperty({})
  salesLimitQuantity?: number;
}
