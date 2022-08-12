import { ApiProperty } from '@nestjs/swagger';

export class FindOneBarcodeDTO {
  @ApiProperty({ required: true, enum: ['id', 'barcode'] })
  type: string;

  @ApiProperty({ required: false, enum: ['Units', 'Items'], isArray: true })
  include: string;
}
