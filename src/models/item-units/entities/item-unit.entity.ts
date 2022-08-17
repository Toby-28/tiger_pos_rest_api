export class ItemUnitEntity {
  id: number;
  id_: number;
  unitId: number;
  itemId: number;
  mainUnit?: boolean;
  lineNr?: number;
  coefficient?: number;
  eActive?: boolean;
  width?: number;
  widthUnit?: string;
  length?: number;
  lengthUnit?: string;
  height?: number;
  heightUnit?: string;
  area?: number;
  areaUnit?: string;
  volume?: number;
  volumeUnit?: string;
  weight?: number;
  weightUnit?: string;
  grossvolume?: number;
  grossvolumeUnit?: string;
  grossweight?: number;
  grossweightUnit?: string;
  createdAt: Date;
  updatedAt: Date;
}
