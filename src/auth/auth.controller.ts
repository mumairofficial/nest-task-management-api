import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) {}

  @Post('/signup')
  public signUp(
    @Body(ValidationPipe) credentialsDto: AuthCredentialsDto
  ): Promise<void> {
    return this.authService.signUp(credentialsDto);
  }

  @Post('/signin')
  public signIn(
    @Body(ValidationPipe) credentialsDto: AuthCredentialsDto
  ): Promise<string> {
    return this.authService.signin(credentialsDto);
  }
}
