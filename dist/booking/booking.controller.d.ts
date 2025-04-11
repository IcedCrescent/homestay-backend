import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create.dto';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    create(data: CreateBookingDto, req: {
        user: {
            userId: number;
        };
    }): Promise<{
        id: number;
        status: number;
        deposit: number;
        from: Date;
        to: Date;
        voucher_code: string | null;
        total_payment: number | null;
        transaction_id: number | null;
        user_id: number;
    }>;
    findAll(): Promise<{
        user: {
            name: string;
            id: number;
        };
        id: number;
        status: number;
        deposit: number;
        from: Date;
        to: Date;
        transaction_id: number | null;
        user_id: number;
        roomBookings: {
            room: {
                roomClass: {
                    price: number;
                };
                name: string;
                id: number;
            };
        }[];
    }[]>;
    findByUserId(userId: string, req: any): Promise<{
        user: {
            name: string;
            id: number;
        };
        id: number;
        status: number;
        deposit: number;
        from: Date;
        to: Date;
        roomBookings: {
            room: {
                roomClass: {
                    name: string;
                    price: number;
                };
                name: string;
                id: number;
            };
        }[];
    }[]>;
    findUserBookingById(id: string, req: any): Promise<{
        id: number;
        fullname: string;
        phone_number: string;
        identity_card_number: string;
        booking_id: number;
    }[]>;
    updateStatus(id: string, data: {
        status: number;
    }, req: any): Promise<{
        id: number;
        status: number;
        deposit: number;
        from: Date;
        to: Date;
        voucher_code: string | null;
        total_payment: number | null;
        transaction_id: number | null;
        user_id: number;
    }>;
    cancel(id: string, req: any): Promise<{
        id: number;
        status: number;
        deposit: number;
        from: Date;
        to: Date;
        voucher_code: string | null;
        total_payment: number | null;
        transaction_id: number | null;
        user_id: number;
    }>;
}
