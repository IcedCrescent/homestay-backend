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
exports.VoucherController = void 0;
const common_1 = require("@nestjs/common");
const voucher_service_1 = require("./voucher.service");
const voucher_dto_1 = require("./dto/voucher.dto");
let VoucherController = class VoucherController {
    voucherService;
    constructor(voucherService) {
        this.voucherService = voucherService;
    }
    async create(data) {
        return this.voucherService.create(data);
    }
    async getAll() {
        return this.voucherService.getAll();
    }
    async getByCode(code) {
        return this.voucherService.getByCode(code);
    }
    async getByFrom(from) {
        return this.voucherService.getByFrom(new Date(from));
    }
    async getByTo(to) {
        return this.voucherService.getByTo(new Date(to));
    }
    async getByMinSpend(minSpend) {
        return this.voucherService.getByMinSpend(Number(minSpend));
    }
    async update(id, data) {
        return this.voucherService.update(Number(id), data);
    }
    async delete(id) {
        return this.voucherService.delete(Number(id));
    }
};
exports.VoucherController = VoucherController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [voucher_dto_1.CreateVoucherDto]),
    __metadata("design:returntype", Promise)
], VoucherController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VoucherController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/code/:code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VoucherController.prototype, "getByCode", null);
__decorate([
    (0, common_1.Get)('/from'),
    __param(0, (0, common_1.Query)('from')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VoucherController.prototype, "getByFrom", null);
__decorate([
    (0, common_1.Get)('/to'),
    __param(0, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VoucherController.prototype, "getByTo", null);
__decorate([
    (0, common_1.Get)('/min-spend'),
    __param(0, (0, common_1.Query)('minSpend')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VoucherController.prototype, "getByMinSpend", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, voucher_dto_1.UpdateVoucherDto]),
    __metadata("design:returntype", Promise)
], VoucherController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VoucherController.prototype, "delete", null);
exports.VoucherController = VoucherController = __decorate([
    (0, common_1.Controller)('voucher'),
    __metadata("design:paramtypes", [voucher_service_1.VoucherService])
], VoucherController);
//# sourceMappingURL=voucher.controller.js.map