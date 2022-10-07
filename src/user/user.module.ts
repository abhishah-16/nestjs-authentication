import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtStrategy]
})
export class UserModule { }
