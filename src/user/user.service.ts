import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true
      }
    })
    return users
  }

  async findOne(id: string, req: Request) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    })
    if (!user) {
      throw new NotFoundException('User does not exists')
    }
    const decodeUser = req.user as { id: string, email: string }
    if (user.id !== decodeUser.id) {
      throw new ForbiddenException()
    }
    delete user.password
    return user
  }
}
