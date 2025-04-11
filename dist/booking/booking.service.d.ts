import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create.dto';
import { UpdateBookingDto } from './dto/update.dto';
import { BookingStatus } from './constants';
export declare class BookingService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createBookingPayload: CreateBookingDto & {
        status: BookingStatus;
        user_id: number;
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
    getAll(): Promise<{
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
    getUserBookingById(id: number): Promise<{
        id: number;
        fullname: string;
        phone_number: string;
        identity_card_number: string;
        booking_id: number;
    }[]>;
    getByUserId(userId: number): Promise<{
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
    updateStatus(id: number, updateBookingDto: UpdateBookingDto): Promise<{
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
    cancel(id: number): Promise<{
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
