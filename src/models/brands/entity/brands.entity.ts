import { Brands } from '@prisma/client';

export class BrandsEntity implements Brands {
  id: number;
  id_: number;
  code: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
