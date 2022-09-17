import { Test, TestingModule } from '@nestjs/testing';
import { ApiCallsService } from './api-calls.service';

describe('ApiCallsService', () => {
  let service: ApiCallsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiCallsService],
    }).compile();

    service = module.get<ApiCallsService>(ApiCallsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
