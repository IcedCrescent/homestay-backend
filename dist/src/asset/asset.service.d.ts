import { PrismaService } from '../prisma/prisma.service';
export declare class AssetService {
    private prisma;
    constructor(prisma: PrismaService);
    createAsset(data: {
        name: string;
        description?: string;
        image?: string;
        amount: number;
    }): Promise<{
        name: string;
        image: string | null;
        id: number;
        createdAt: Date;
        description: string | null;
        amount: number;
    }>;
    getAllAssets(): Promise<{
        name: string;
        image: string | null;
        id: number;
        createdAt: Date;
        description: string | null;
        amount: number;
    }[]>;
    getAssetById(id: number): Promise<{
        name: string;
        image: string | null;
        id: number;
        createdAt: Date;
        description: string | null;
        amount: number;
    } | null>;
    updateAsset(id: number, data: Partial<{
        name: string;
        description?: string;
        image?: string;
        amount: number;
    }>): Promise<{
        name: string;
        image: string | null;
        id: number;
        createdAt: Date;
        description: string | null;
        amount: number;
    }>;
    deleteAsset(id: number): Promise<{
        name: string;
        image: string | null;
        id: number;
        createdAt: Date;
        description: string | null;
        amount: number;
    }>;
}
