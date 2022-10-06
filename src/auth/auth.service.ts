import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signup(dto: Prisma.userCreateInput) {
        const { name, email, password } = dto
        const foundUser = await this.prisma.user.findUnique({
            where: {
                email
            }
        })
        if (foundUser) {
            throw new BadRequestException('Email already exists')
        }
        const hashpassword = await this.hashpassword(password)
        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashpassword
            }
        })
        return user
    }
    async signin() {

    }
    async signout() {

    }

    async hashpassword(password: string) {
        const hash = await bcrypt.hash(password, 12)
        return hash
    }
}
