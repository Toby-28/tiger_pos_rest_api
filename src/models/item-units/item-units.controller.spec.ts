import { Test, TestingModule } from '@nestjs/testing';
import { ItemUnitsController } from './item-units.controller';
import { ItemUnitsService } from './item-units.service';

describe('ItemUnitsController', () => {
  let controller: ItemUnitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemUnitsController],
      providers: [ItemUnitsService],
    }).compile();

    controller = module.get<ItemUnitsController>(ItemUnitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
