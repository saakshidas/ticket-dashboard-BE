import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto.username, dto.password);
    return user;
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const res = await this.authService.login(dto.username, dto.password);
    return res;
  }

  @Get('me')
  me() {
    return { message: 'implement auth guard to return current user' };
  }
}
