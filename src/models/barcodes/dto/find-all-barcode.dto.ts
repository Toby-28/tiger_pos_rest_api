import { ApiProperty } from '@nestjs/swagger';

export class FindAllBarcodeDTO {
  @ApiProperty({ required: false })
  skip: number;

  @ApiProperty({ required: false, default: 10 })
  take: number;

  @ApiProperty({
    required: false,
    enum: ['Items','Units'],
    isArray: true,
  })
  include: string[];
}
