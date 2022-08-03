import { ApiProperty } from '@nestjs/swagger';

export class FindOneClentDTO {
  @ApiProperty({ enum: ['id', 'code'] })
  type: string;
}
