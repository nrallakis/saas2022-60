import { Test, TestingModule } from '@nestjs/testing';
import { AtlController } from './atl.controller';
import { AtlService } from './atl.service';

describe('AtlController', () => {
  let controller: AtlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtlController],
      providers: [AtlService],
    }).compile();

    controller = module.get<AtlController>(AtlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
