import { ApiProperty } from '@nestjs/swagger';

export class CreateBarcodeDto {
  @ApiProperty({ required: true })
  itemsId: number;

  @ApiProperty({ required: true })
  itemUnitId: number;

  @ApiProperty({ required: true })
  unitId: number;

  @ApiProperty({ required: true })
  lineNr: number;

  @ApiProperty({ required: true })
  barcode: string;
}
