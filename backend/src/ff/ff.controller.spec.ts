import { Test, TestingModule } from '@nestjs/testing';
import { FfController } from './ff.controller';
import { FfService } from './ff.service';

describe('FfController', () => {
  let controller: FfController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FfController],
      providers: [FfService],
    }).compile();

    controller = module.get<FfController>(FfController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
