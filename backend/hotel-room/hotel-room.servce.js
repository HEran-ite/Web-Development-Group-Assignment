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
exports.HotelRoomService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let HotelRoomService = class HotelRoomService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async economicroom() {
        const allRoom = await this.prisma.room.findMany({
            where: {
                classId: 3
            }
        });
        return allRoom;
    }
    async viproom() {
        const allRoom = await this.prisma.room.findMany({
            where: {
                classId: 1
            }
        });
        return allRoom;
    }
    async middleroom() {
        const allRoom = await this.prisma.room.findMany({
            where: {
                classId: 2
            }
        });
        return allRoom;
    }
    async findById(id) {
        const room = await this.prisma.room.findUnique({
            where: {
                id: Number(id),
            }
        });
        return room;
    }
    async create(roomObj, Image) {
        const newHotelRoom = await this.prisma.room.create({
            data: {
                description: roomObj.description,
                title: roomObj.title,
                image: 'http://localhost:9100/hotelroom/image/' + Image,
                classId: Number(roomObj.classId),
                price: Number(roomObj.price),
            }
        });
        return newHotelRoom;
    }
    async update(id, roomObj, Image) {
        if (Image) {
            const updated = await this.prisma.room.update({
                where: {
                    id: Number(id),
                },
                data: {
                    description: roomObj.description,
                    title: roomObj.title,
                    image: 'http://localhost:9100/hotelroom/image/' + Image,
                    classId: Number(roomObj.classId),
                    price: Number(roomObj.price),
                    avaliable: Boolean(roomObj.avaliable)
                }
            });
            return updated;
        }
        const updated = await this.prisma.room.update({
            where: {
                id: Number(id),
            },
            data: {
                description: roomObj.description,
                title: roomObj.title,
                classId: Number(roomObj.classId),
                price: Number(roomObj.price),
                avaliable: Boolean(roomObj.avaliable)
            }
        });
        return updated;
    }
    async delete(id) {
        const deletedRoom = await this.prisma.room.delete({
            where: {
                id: Number(id),
            }
        });
        return deletedRoom;
    }
    async createRequest(roomrequestDto) {
        const createrequest = await this.prisma.customerRequest.create({
            data: {
                roomid: Number(roomrequestDto.roomId),
                to: new Date(roomrequestDto.to),
                approval: false,
                form: new Date(roomrequestDto.from),
            }
        });
        return createrequest;
    }
    async cancelRequest(id) {
        const deletedrequest = await this.prisma.customerRequest.delete({
            where: {
                id: Number(id)
            }
        });
        return deletedrequest;
    }
    async updateRequest(id, roomrequestDto) {
        const updatedRequet = await this.prisma.customerRequest.update({
            where: {
                id: Number(id)
            },
            data: {
                roomid: Number(roomrequestDto.roomId),
                to: new Date(roomrequestDto.to),
                form: new Date(roomrequestDto.from),
                approval: false,
            }
        });
        return updatedRequet;
    }
    async getAllRequest() {
        return await this.prisma.customerRequest.findMany();
    }
};
exports.HotelRoomService = HotelRoomService;
exports.HotelRoomService = HotelRoomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HotelRoomService);
//# sourceMappingURL=hotel-room.servce.js.map