import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  signup(@Body() dto: Prisma.userCreateInput) {
    return this.authService.signup(dto)
  }

  @Post('signin')
  signin(@Body() dto: AuthDto, @Req() req, @Res() res) {
    return this.authService.signin(dto,req,res)
  }

  @Get('signout')
  signout() {
    return this.authService.signout()
  }
}
