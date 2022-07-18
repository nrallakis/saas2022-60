import { Test, TestingModule } from '@nestjs/testing';
import { FFService } from './ff.service';

describe('FfService', () => {
  let service: FFService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FFService],
    }).compile();

    service = module.get<FFService>(FFService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
