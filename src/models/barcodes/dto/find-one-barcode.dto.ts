import { ApiProperty } from '@nestjs/swagger';
import { BarcodeRelationEnum } from '../enums/BarcodeRealtionEnums';

export class FindOneBarcodeDTO {
  @ApiProperty({ required: true, enum: ['id', 'barcode'] })
  type: string;

  @ApiProperty({ required: false, enum: BarcodeRelationEnum, isArray: true })
  include: string;
}
