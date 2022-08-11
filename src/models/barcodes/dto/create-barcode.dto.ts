import { ApiProperty } from '@nestjs/swagger';

export class CreateBarcodeDto {
  @ApiProperty({})
  itemId: number;

  @ApiProperty({})
  itemUnitId: number;

  @ApiProperty({})
  unitId: number;

  @ApiProperty({})
  lineNr: number;

  @ApiProperty({})
  barcode: string;
}
