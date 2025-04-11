import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AssetService {
  constructor(private prisma: PrismaService) {}

  async createAsset(data: {
    name: string;
    description?: string;
    image?: string;
    amount: number;
  }) {
    return await this.prisma.asset.create({
      data,
    });
  }

  async getAllAssets() {
    return await this.prisma.asset.findMany();
  }

  async getAssetById(id: number) {
    return await this.prisma.asset.findUnique({
      where: { id },
    });
  }

  async updateAsset(
    id: number,
    data: Partial<{
      name: string;
      description?: string;
      image?: string;
      amount: number;
    }>,
  ) {
    return await this.prisma.asset.update({
      where: { id },
      data,
    });
  }

  async deleteAsset(id: number) {
    return await this.prisma.asset.delete({
      where: { id },
    });
  }
}
