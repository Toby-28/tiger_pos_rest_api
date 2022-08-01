import { ApiProperty } from '@nestjs/swagger';
import { BarcodeRelationEnum } from '../enums/BarcodeRealtionEnums';

export class FindAllBarcodeDTO {
  @ApiProperty({ required: false })
  skip: number;

  @ApiProperty({ required: false, default: 10 })
  take: number;

  @ApiProperty({
    required: false,
    enum: BarcodeRelationEnum,
    isArray: true,
  })
  include: string[];
}
