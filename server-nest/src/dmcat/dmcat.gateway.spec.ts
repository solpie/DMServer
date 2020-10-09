import { Test, TestingModule } from '@nestjs/testing';
import { DmcatGateway } from './dmcat.gateway';

describe('DmcatGateway', () => {
  let gateway: DmcatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DmcatGateway],
    }).compile();

    gateway = module.get<DmcatGateway>(DmcatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
