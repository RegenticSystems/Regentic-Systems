import { Controller, Post, Body, UseGuards, Request, Get } from "@nestjs/common";
import { AuthService }     from "./auth.service";
import { LoginDto, RegisterDto, RefreshTokenDto } from "./dto";
import { JwtAuthGuard }    from "./guards/jwt-auth.guard";
import { RolesGuard }      from "./guards/roles.guard";
import { Roles }           from "./guards/roles.decorator";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register") register(@Body() dto: RegisterDto)         { return this.authService.register(dto);              }
  @Post("login")    login(@Body() dto: LoginDto)               { return this.authService.validateUser(dto);          }
  @Post("refresh")  refreshToken(@Body() dto: RefreshTokenDto) { return this.authService.refreshToken(dto.refreshToken); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "TENANT_ADMIN")
  @Get("me") @ApiBearerAuth()
  getProfile(@Request() req) { return req.user; }
}
