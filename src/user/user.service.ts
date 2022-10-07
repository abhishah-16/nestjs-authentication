import { BadRequestException, Injectable } from '@nestjs/common';
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
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    })
    if (!user) {
      throw new BadRequestException('User does not exists')
    }
    return user
  }
}
