import { Test, TestingModule } from '@nestjs/testing';
import { AtlService } from './atl.service';

describe('AtlService', () => {
  let service: AtlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtlService],
    }).compile();

    service = module.get<AtlService>(AtlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
