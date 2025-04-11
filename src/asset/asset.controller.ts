import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { AssetService } from './asset.service';

@Controller('assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  async createAsset(
    @Body()
    body: {
      name: string;
      description?: string;
      image?: string;
      amount: number;
    },
  ) {
    return this.assetService.createAsset(body);
  }

  @Get()
  async getAllAssets() {
    return this.assetService.getAllAssets();
  }

  @Get(':id')
  async getAssetById(@Param('id') id: string) {
    return this.assetService.getAssetById(Number(id));
  }

  @Put(':id')
  async updateAsset(
    @Param('id') id: string,
    @Body()
    body: Partial<{
      name: string;
      description?: string;
      image?: string;
      amount: number;
    }>,
  ) {
    return this.assetService.updateAsset(Number(id), body);
  }

  @Delete(':id')
  async deleteAsset(@Param('id') id: string) {
    return this.assetService.deleteAsset(Number(id));
  }
}
