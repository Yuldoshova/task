import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ForgotPasswordDto, LoginDto, RefreshTokenDto, RegisterDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller({ version: "1", path: "auth" })
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post("/register")
  register(
    @Body() payload: RegisterDto
  ) {
    return this.authService.signUp(payload);
  }

  @Post("/login")
  login(
    @Body() payload: LoginDto
  ) {
    return this.authService.signIn(payload);
  }

  @Post("/refresh-token")
  refreshToken(
    @Body() payload: RefreshTokenDto
  ) {
    return this.authService.updatedToken(payload);
  }

  @Post("/forgot-password")
  forgotPassword(
    @Body() payload: ForgotPasswordDto
  ) {
    return this.authService.updatedPassword(payload);
  }

}
