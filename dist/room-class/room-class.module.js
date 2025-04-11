"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomClassModule = void 0;
const common_1 = require("@nestjs/common");
const room_class_service_1 = require("./room-class.service");
const room_class_controller_1 = require("./room-class.controller");
const prisma_service_1 = require("../prisma/prisma.service");
let RoomClassModule = class RoomClassModule {
};
exports.RoomClassModule = RoomClassModule;
exports.RoomClassModule = RoomClassModule = __decorate([
    (0, common_1.Module)({
        controllers: [room_class_controller_1.RoomClassController],
        providers: [room_class_service_1.RoomClassService, prisma_service_1.PrismaService],
    })
], RoomClassModule);
//# sourceMappingURL=room-class.module.js.map