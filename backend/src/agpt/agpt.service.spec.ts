import { Test, TestingModule } from '@nestjs/testing';
import { AgptService } from './agpt.service';

describe('AgptService', () => {
  let service: AgptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgptService],
    }).compile();

    service = module.get<AgptService>(AgptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
