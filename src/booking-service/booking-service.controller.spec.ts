import { Test, TestingModule } from '@nestjs/testing';
import { BookingServiceController } from './booking-service.controller';

describe('BookingServiceController', () => {
  let controller: BookingServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingServiceController],
    }).compile();

    controller = module.get<BookingServiceController>(BookingServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
