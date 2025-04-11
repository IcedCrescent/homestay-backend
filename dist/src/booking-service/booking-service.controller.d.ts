import { BookingServiceService } from './booking-service.service';
export declare class BookingServiceController {
    private readonly bookingService;
    constructor(bookingService: BookingServiceService);
    findAll(): Promise<{
        name: string;
        id: number;
        type: import(".prisma/client").$Enums.ServiceType;
        description: string | null;
        price: number;
        amount: number;
        amount_unit: import(".prisma/client").$Enums.ServiceAmountUnit;
    }[]>;
}
