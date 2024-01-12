import { PrismaService } from 'src/prisma/prisma.service';
import { RoomDto, RoomRequestDto } from './dto';
export declare class HotelRoomService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findById(id: number): Promise<{
        id: number;
        title: string;
        image: string;
        avaliable: boolean;
        price: number;
        description: string;
        classId: number;
    } | null>;
    create(roomObj: RoomDto, Image: string): Promise<{
        id: number;
        title: string;
        image: string;
        avaliable: boolean;
        price: number;
        description: string;
        classId: number;
    }>;
    update(id: number, roomObj: RoomDto, Image: string): Promise<{
        id: number;
        title: string;
        image: string;
        avaliable: boolean;
        price: number;
        description: string;
        classId: number;
    }>;
    delete(id: number): Promise<{
        id: number;
        title: string;
        image: string;
        avaliable: boolean;
        price: number;
        description: string;
        classId: number;
    }>;
    createRequest(roomrequestDto: RoomRequestDto): Promise<{
        id: number;
        roomid: number;
        approval: boolean;
        form: Date;
        to: Date;
    }>;
    cancelRequest(id: number): Promise<{
        id: number;
        roomid: number;
        approval: boolean;
        form: Date;
        to: Date;
    }>;
    updateRequest(id: number, roomrequestDto: RoomRequestDto): Promise<{
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
}
