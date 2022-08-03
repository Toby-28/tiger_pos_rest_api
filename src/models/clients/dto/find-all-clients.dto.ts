import { ApiProperty } from '@nestjs/swagger';

export class FindAllClientsDTO {
  @ApiProperty({ required: false })
  skip: number;

  @ApiProperty({ required: false, default: 10 })
  take: number;
}
