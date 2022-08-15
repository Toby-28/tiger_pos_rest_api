import { BrandsEntity } from '../entity/brands.entity';

export class BrandsDTO {
  id: number;
  code: string;
  name: string;

  constructor(
    private readonly entity?: BrandsEntity,
    private readonly dto?: BrandsDTO,
  ) {}

  toEntity(object: BrandsDTO) {
    const model = this.entity;
    model.id_ = object.id;
    delete model.id;

    return model;
  }

  toDTO(object: BrandsEntity) {
    const model = this.dto;

    return model;
  }
}
