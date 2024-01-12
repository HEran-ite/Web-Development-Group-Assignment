/// <reference types="multer" />
import { HotelRoomService } from "./hotel-room.servce";
import { RoomDto, RoomRequestDto } from "./dto";
export declare const storage: {
    storage: import("multer").StorageEngine;
};
export declare class HotelRoomController {
    private service;
    constructor(service: HotelRoomService);
    economicroom(): Promise<{
        id: number;
        title: string;
        image: string;
        avaliable: boolean;
        price: number;
        description: string;
        classId: number;
    }[]>;
    viproom(): Promise<{
        id: number;
        title: string;
        image: string;
        avaliable: boolean;
        price: number;
        description: string;
        classId: number;
    }[]>;
    middleroom(): Promise<{
        id: number;
        title: string;
        image: string;
        avaliable: boolean;
        price: number;
        description: string;
        classId: number;
    }[]>;
    findByid(id: number): Promise<{
        id: number;
        title: string;
        image: string;
        avaliable: boolean;
        price: number;
        description: string;
        classId: number;
    } | null>;
    createRoom(roomObj: RoomDto, Image: Express.Multer.File): Promise<{
        id: number;
        title: string;
        image: string;
        avaliable: boolean;
        price: number;
        description: string;
        classId: number;
    }>;
    updateRoom(id: number, roomData: RoomDto, Image: Express.Multer.File): Promise<{
        id: number;
        title: string;
        image: string;
        avaliable: boolean;
        price: number;
        description: string;
        classId: number;
    }>;
    deleteRoom(id: number): Promise<{
        id: number;
        title: string;
        image: string;
        avaliable: boolean;
        price: number;
        description: string;
        classId: number;
    }>;
    userRequestCreate(roomrequestDto: RoomRequestDto): Promise<{
        id: number;
        roomid: number;
        approval: boolean;
        form: Date;
        to: Date;
    }>;
    userrequestDelete(id: number): Promise<{
        id: number;
        roomid: number;
        approval: boolean;
        form: Date;
        to: Date;
    }>;
    userRequestUpdate(id: number, roomRequestDto: RoomRequestDto): Promise<{
        id: number;
        roomid: number;
        approval: boolean;
        form: Date;
        to: Date;
    }>;
    getAllRequest(): Promise<{
        id: number;
        roomid: number;
        approval: boolean;
        form: Date;
        to: Date;
    }[]>;
    findImage(imagename: string, res: any): import("rxjs").Observable<any>;
}
