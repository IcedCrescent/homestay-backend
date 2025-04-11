import { Test, TestingModule } from '@nestjs/testing';
import { RoomClassController } from './room-class.controller';

describe('RoomClassController', () => {
  let controller: RoomClassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomClassController],
    }).compile();

    controller = module.get<RoomClassController>(RoomClassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
