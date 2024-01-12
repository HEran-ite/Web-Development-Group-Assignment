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
exports.HotelRoomController = exports.storage = void 0;
const common_1 = require("@nestjs/common");
const hotel_room_servce_1 = require("./hotel-room.servce");
const dto_1 = require("./dto");
const guard_1 = require("../auth/guard");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const path = require("path");
const path_1 = require("path");
const rxjs_1 = require("rxjs");
exports.storage = {
    storage: (0, multer_1.diskStorage)({
        destination: './rooms/Image',
        filename: (req, file, cb) => {
            const filename = path.parse(file.originalname).name.replace(/\s/g, '') + (0, uuid_1.v4)();
            const extension = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`);
        }
    })
};
let HotelRoomController = class HotelRoomController {
    constructor(service) {
        this.service = service;
    }
    economicroom() {
        return this.service.economicroom();
    }
    viproom() {
        return this.service.viproom();
    }
    middleroom() {
        return this.service.middleroom();
    }
    findByid(id) {
        return this.service.findById(id);
    }
    async createRoom(roomObj, Image) {
        return await this.service.create(roomObj, Image.filename);
    }
    async updateRoom(id, roomData, Image) {
        return await this.service.update(id, roomData, Image.filename);
    }
    async deleteRoom(id) {
        return await this.service.delete(id);
    }
    async userRequestCreate(roomrequestDto) {
        return await this.service.createRequest(roomrequestDto);
    }
    async userrequestDelete(id) {
        return await this.service.cancelRequest(id);
    }
    async userRequestUpdate(id, roomRequestDto) {
        return await this.service.updateRequest(Number(id), roomRequestDto);
    }
    async getAllRequest() {
        return await this.service.getAllRequest();
    }
    findImage(imagename, res) {
        return (0, rxjs_1.of)(res.sendFile((0, path_1.join)(process.cwd(), 'rooms/Image/' + imagename)));
    }
};
exports.HotelRoomController = HotelRoomController;
__decorate([
    (0, common_1.Get)('economic'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HotelRoomController.prototype, "economicroom", null);
__decorate([
    (0, common_1.Get)('vip'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HotelRoomController.prototype, "viproom", null);
__decorate([
    (0, common_1.Get)('middle'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HotelRoomController.prototype, "middleroom", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HotelRoomController.prototype, "findByid", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Post)('create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('Image', exports.storage)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RoomDto, Object]),
    __metadata("design:returntype", Promise)
], HotelRoomController.prototype, "createRoom", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('Image', exports.storage)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.RoomDto, Object]),
    __metadata("design:returntype", Promise)
], HotelRoomController.prototype, "updateRoom", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HotelRoomController.prototype, "deleteRoom", null);
__decorate([
    (0, common_1.Post)('room-request'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RoomRequestDto]),
    __metadata("design:returntype", Promise)
], HotelRoomController.prototype, "userRequestCreate", null);
__decorate([
    (0, common_1.Delete)('room-delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HotelRoomController.prototype, "userrequestDelete", null);
__decorate([
    (0, common_1.Put)('room-update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.RoomRequestDto]),
    __metadata("design:returntype", Promise)
], HotelRoomController.prototype, "userRequestUpdate", null);
__decorate([
    (0, common_1.Get)('room-requests'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HotelRoomController.prototype, "getAllRequest", null);
__decorate([
    (0, common_1.Get)('image/:imagename'),
    __param(0, (0, common_1.Param)('imagename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], HotelRoomController.prototype, "findImage", null);
exports.HotelRoomController = HotelRoomController = __decorate([
    (0, common_1.Controller)('hotelroom'),
    __metadata("design:paramtypes", [hotel_room_servce_1.HotelRoomService])
], HotelRoomController);
//# sourceMappingURL=hotel-room.controller.js.map