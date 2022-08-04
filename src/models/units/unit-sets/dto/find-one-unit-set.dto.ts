import { ApiProperty } from '@nestjs/swagger';

export class FindOneUnitSetDTO {
  @ApiProperty({ enum: ['id', 'code'] })
  type: string;
}
