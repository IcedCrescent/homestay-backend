import { PrismaService } from 'src/prisma/prisma.service';
export declare class BookingServiceService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<{
        name: string;
        id: number;
        type: import(".prisma/client").$Enums.ServiceType;
        description: string | null;
        price: number;
        amount: number;
        amount_unit: import(".prisma/client").$Enums.ServiceAmountUnit;
    }[]>;
}
