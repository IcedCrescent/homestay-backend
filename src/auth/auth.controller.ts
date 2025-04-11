import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/user/dto/login.dto';
import { SignUpDto } from 'src/user/dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(
    @Body()
    body: SignUpDto,
  ) {
    const signupData = {
      ...body,
      salary: null,
      remainDayOff: null,
      spent: 0,
      role: 'CUSTOMER',
    };

    return this.authService.signup(signupData);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }
}
