import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) { }

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
    async signin(dto: AuthDto, req: Request, res: Response) {
        const { email, password } = dto
        const foundUser = await this.prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!foundUser) {
            throw new BadRequestException('Invalid Credentials')
        }
        const isMatch = await this.comparePassword(password, foundUser.password)
        if (!isMatch) {
            throw new BadRequestException('Invalid Credentials')
        }
        const token = await this.signToken(foundUser.id, foundUser.email)
        res.cookie('token', token)
        res.send({ message: 'successfully login' })
    }

    async signout() {

    }

    async hashpassword(password: string) {
        const hash = await bcrypt.hash(password, 12)
        return hash
    }

    async comparePassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash)
    }

    async signToken(id: string, email: string) {
        const payload = {
            id, email
        }
        const token = this.jwt.sign(payload, {
            secret: process.env.JWT_SECRET
        })
        return token
    }
}
