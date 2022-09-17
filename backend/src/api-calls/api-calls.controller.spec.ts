import { Test, TestingModule } from '@nestjs/testing';
import { ApiCallsController } from './api-calls.controller';

describe('ApiCallsController', () => {
  let controller: ApiCallsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiCallsController],
    }).compile();

    controller = module.get<ApiCallsController>(ApiCallsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
