import { Test, TestingModule } from '@nestjs/testing';
import { FfService } from './ff.service';

describe('FfService', () => {
  let service: FfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FfService],
    }).compile();

    service = module.get<FfService>(FfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
