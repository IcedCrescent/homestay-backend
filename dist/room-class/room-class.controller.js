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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomClassController = void 0;
const common_1 = require("@nestjs/common");
const room_class_service_1 = require("./room-class.service");
const create_room_class_dto_1 = require("./dto/create-room-class.dto");
const update_room_class_dto_1 = require("./dto/update-room-class.dto");
let RoomClassController = class RoomClassController {
    roomClassService;
    constructor(roomClassService) {
        this.roomClassService = roomClassService;
    }
    create(createRoomClassDto) {
        return this.roomClassService.create(createRoomClassDto);
    }
    findAll() {
        return this.roomClassService.findAll();
    }
    findOne(id) {
        return this.roomClassService.findOne(id);
    }
    update(id, updateRoomClassDto) {
        return this.roomClassService.update(id, updateRoomClassDto);
    }
    async getRoomImage(id, res) {
        this.roomClassService.downloadRoomImage(`room-class/${id}`).pipe(res);
    }
    async updateRoomImage(id, request) {
        const bytes = await this.streamToBuffer(request);
        const imagePath = `room-class/${id}`;
        await this.roomClassService.uploadRoomImage(imagePath, bytes, {
            metadata: {
                contentType: request.headers['content-type'],
            },
        });
        await this.roomClassService.update(id, {
            images: imagePath,
        });
    }
    async streamToBuffer(readable) {
        return new Promise((resolve, reject) => {
            const chunks = [];
            readable.on('data', (chunk) => chunks.push(chunk));
            readable.on('end', () => resolve(Buffer.concat(chunks)));
            readable.on('error', reject);
        });
    }
    remove(id) {
        return this.roomClassService.remove(id);
    }
};
exports.RoomClassController = RoomClassController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_class_dto_1.CreateRoomClassDto]),
    __metadata("design:returntype", void 0)
], RoomClassController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoomClassController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RoomClassController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_room_class_dto_1.UpdateRoomClassDto]),
    __metadata("design:returntype", void 0)
], RoomClassController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(':id/image'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RoomClassController.prototype, "getRoomImage", null);
__decorate([
    (0, common_1.Post)(':id/image'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RoomClassController.prototype, "updateRoomImage", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RoomClassController.prototype, "remove", null);
exports.RoomClassController = RoomClassController = __decorate([
    (0, common_1.Controller)('room-class'),
    __metadata("design:paramtypes", [room_class_service_1.RoomClassService])
], RoomClassController);
//# sourceMappingURL=room-class.controller.js.map