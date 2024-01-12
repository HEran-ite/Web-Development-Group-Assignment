/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Param, Post, Get } from '@nestjs/common';

import { RoomDto } from './roomRequestDto';
import { CustomRequestServiceHandeler } from './customer-request.service';

@Controller('user-request')
export class CustomerRequestController {
    constructor(private service: CustomRequestServiceHandeler) {}

   


}
