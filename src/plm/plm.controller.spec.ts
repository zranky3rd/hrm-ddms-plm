import { Test, TestingModule } from '@nestjs/testing';
import { PlmController } from './plm.controller';

describe('PlmController', () => {
  let controller: PlmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlmController],
    }).compile();

    controller = module.get<PlmController>(PlmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
