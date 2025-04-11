"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomClassService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const storage_1 = require("@google-cloud/storage");
const config_1 = require("@nestjs/config");
let RoomClassService = class RoomClassService {
    prisma;
    configService;
    storage;
    bucketName;
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
        this.bucketName = this.configService.get('GCP_STORAGE_BUCKET');
        this.storage = new storage_1.Storage({
            credentials: {
                private_key: this.configService
                    .get('GCP_STORAGE_PRIVATE_KEY')
                    ?.replace(/\\n/g, '\n'),
                client_email: this.configService.get('GCP_STORAGE_CLIENT_EMAIL'),
            },
            projectId: this.configService.get('GCP_STORAGE_PROJECT_ID'),
        });
    }
    async create(data) {
        return this.prisma.roomClass.create({
            data,
        });
    }
    async findAll() {
        return this.prisma.roomClass.findMany();
    }
    async findOne(id) {
        const roomClass = await this.prisma.roomClass.findUnique({
            where: { id },
        });
        if (!roomClass) {
            throw new common_1.NotFoundException(`RoomClass with ID ${id} not found`);
        }
        return roomClass;
    }
    async update(id, data) {
        const roomClass = await this.prisma.roomClass.findUnique({
            where: { id },
        });
        if (!roomClass) {
            throw new common_1.NotFoundException(`RoomClass with ID ${id} not found`);
        }
        return this.prisma.roomClass.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        const roomClass = await this.prisma.roomClass.findUnique({
            where: { id },
        });
        if (!roomClass) {
            throw new common_1.NotFoundException(`RoomClass with ID ${id} not found`);
        }
        return this.prisma.roomClass.delete({
            where: { id },
        });
    }
    async uploadRoomImage(filePath, data, options) {
        await this.storage.bucket(this.bucketName).file(filePath).save(data, options);
    }
    downloadRoomImage(filePath) {
        return this.storage.bucket(this.bucketName).file(filePath).createReadStream();
    }
};
exports.RoomClassService = RoomClassService;
exports.RoomClassService = RoomClassService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], RoomClassService);
//# sourceMappingURL=room-class.service.js.map