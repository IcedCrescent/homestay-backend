import { AssetService } from './asset.service';
export declare class AssetController {
    private readonly assetService;
    constructor(assetService: AssetService);
    createAsset(body: {
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
    getAssetById(id: string): Promise<{
        name: string;
        image: string | null;
        id: number;
        createdAt: Date;
        description: string | null;
        amount: number;
    } | null>;
    updateAsset(id: string, body: Partial<{
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
    deleteAsset(id: string): Promise<{
        name: string;
        image: string | null;
        id: number;
        createdAt: Date;
        description: string | null;
        amount: number;
    }>;
}
