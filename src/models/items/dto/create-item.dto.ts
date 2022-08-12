import { ApiProperty } from '@nestjs/swagger';
import { CartTypeEnums } from '../enums/CartTypeEnums';

export class CreateItemDto {
  @ApiProperty({})
  id_: number;
  
  @ApiProperty({})
  code: string;

  @ApiProperty({ required: false })
  eCode: string;

  @ApiProperty({ required: false })
  producerCode: string;

  @ApiProperty({ required: false })
  active: boolean;

  @ApiProperty({ enum: CartTypeEnums })
  cardType: number;

  @ApiProperty({})
  name: string;

  @ApiProperty({ required: false })
  name2: string;

  @ApiProperty({ required: false })
  name3: string;

  @ApiProperty({ required: false })
  name4: string;

  @ApiProperty({ required: false })
  specode1: string;

  @ApiProperty({ required: false })
  specode2: string;

  @ApiProperty({ required: false })
  specode3: string;

  @ApiProperty({ required: false })
  specode4: string;

  @ApiProperty({ required: false })
  specode5: string;

  @ApiProperty({ required: false })
  keyword1: string;

  @ApiProperty({ required: false })
  keyword2: string;

  @ApiProperty({ required: false })
  keyword3: string;

  @ApiProperty({ required: false })
  keyword4: string;

  @ApiProperty({ required: false })
  keyword5: string;

  @ApiProperty({ required: false })
  origin: string;

  @ApiProperty({ required: false })
  category: string;

  @ApiProperty({})
  mainUnit: string;

  @ApiProperty({})
  mainUnitId: number;

  @ApiProperty({ required: false })
  brandId: number;

  @ApiProperty({ required: false })
  variationCode: string;

  @ApiProperty({ required: false })
  reyonCode: string;

  @ApiProperty({ required: false })
  salesLimitQuantity: number;
}
