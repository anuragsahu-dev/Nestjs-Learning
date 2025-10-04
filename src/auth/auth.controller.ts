import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from '../user/user.service';

@Controller('auth') // here this auth is a prefix
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register') // /auth/register
  async register(@Body() registerUserDto: RegisterDto) {
    const createdUser = this.authService.registerUser(registerUserDto);
    return createdUser;
  }

  // assignment make login controller

  // implememt getProfile controller with protected route

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const userId = req.user.sub;
    const user = await this.userService.getUserById(userId);

    return {
      id: user?.id,
      fname: user?.fname,
      lname: user?.lname,
      email: user?.email,
    };
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
