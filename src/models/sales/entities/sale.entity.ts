import { ApiProperty } from '@nestjs/swagger';

export class SalesEntity {
  @ApiProperty({})
  id: number;

  @ApiProperty({})
  id_: number;

  @ApiProperty({ default: '~' })
  code: String;

  @ApiProperty({ default: new Date() })
  date: Date;

  @ApiProperty({ default: '333 MONA' })
  clientCode: String;

  @ApiProperty({ default: 1 })
  divisionNr: number;

  @ApiProperty({ default: 11 })
  warehouseNr: number;

  @ApiProperty({
    required: false,
    example: 'SalesManCode - Satish eleman kodu',
  })
  employeeCode: String;

  @ApiProperty({ required: false })
  docNumber: String;

  @ApiProperty({ required: false })
  docTrack: String;

  @ApiProperty({ required: false })
  projectCode: String;

  @ApiProperty({ required: false })
  note1: String;

  @ApiProperty({ required: false })
  note2: String;

  @ApiProperty({ required: false })
  note3: String;

  @ApiProperty({ required: false })
  note4: String;

  @ApiProperty({ required: false })
  note5: String;

  @ApiProperty({ required: false })
  note6: String;

  @ApiProperty({ required: false })
  text: String;

  @ApiProperty({ required: false })
  specode: String;

  @ApiProperty({ required: false })
  authCode: String;
}
