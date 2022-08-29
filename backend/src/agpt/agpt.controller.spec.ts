import { Test, TestingModule } from '@nestjs/testing';
import { AgptController } from './agpt.controller';
import { AgptService } from './agpt.service';

describe('AgptController', () => {
  let controller: AgptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgptController],
      providers: [AgptService],
    }).compile();

    controller = module.get<AgptController>(AgptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
