import { ApiProperty } from '@nestjs/swagger';

export class QueryBarcodeDTO {
  @ApiProperty({ required: false })
  skip?: number;

  @ApiProperty({ required: false, default: 10 })
  take?: number;

  @ApiProperty({ required: false })
  include?: string;
}
