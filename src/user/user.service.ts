import { Injectable } from '@nestjs/common';
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

  async findOne(id: string) {
    const users = await this.prisma.user.findMany()
  }

}
