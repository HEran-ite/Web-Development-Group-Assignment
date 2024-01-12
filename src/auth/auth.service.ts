/* eslint-disable prettier/prettier */

import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";``
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";



@Injectable({

})
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService){}
    async signup (authObject: AuthDto) {
        try{
            const hashed_pass = await argon.hash(authObject.password);

            const user = await this.prisma.user.create({
                data: {
                    email: authObject.email,
                    password: hashed_pass,
                },

                select: {
                    email: true,
                    created: true,
                }
            });
            

            return user

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError){
                if (error.code === 'P2002') {
                    throw new ForbiddenException('taken Credientals');
                }
            }
            throw error;
        }
        
    }

    async signin (authObject: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where:{
                email:authObject.email,
            }
        })

        if(!user) throw new ForbiddenException('Credentials not found')
        const pwMatch = await argon.verify(user.password, authObject.password)

        if (!pwMatch) throw new ForbiddenException('Incorrect password')
        return this.signToken(user.id, user.email);
    }

    async signToken(
        userId: number,
        email: string,
      ): Promise<{ access_token: string }> {
        const payload = {
          sub: userId,
          email,
        };
        const secret = this.config.get('JWT_SECRET');
    
        const token = await this.jwt.signAsync(
          payload,
          {
            expiresIn: '120m',
            secret: secret,
          },
        );
    
        return {
          access_token: token,
        };
      }
}