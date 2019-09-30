import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

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
  ): Promise<{ accessToken: string }> {
    return this.authService.signin(credentialsDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() req: User) {
    console.log(req)
    return req
  }
}
