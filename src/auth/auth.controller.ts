import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';

@Controller('auth') // here this auth is a prefix
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') // /auth/register
  register(@Body() registerUserDto: RegisterDto) {
    const result = this.authService.registerUser(registerUserDto);
    return result;
  }
}

/*
  authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  we can also created the short version of this in typescript

  constructor(private readonly authService: AuthService){};

  hum public bana sakte hai.
*/
