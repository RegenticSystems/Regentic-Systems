import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService }    from "@nestjs/jwt";
import * as bcrypt       from "bcryptjs";
import { PrismaService } from "@synapse/database";
import { RegisterDto }   from "./dto/register.dto";
import { LoginDto }      from "./dto/login.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma:  PrismaService,
    private readonly jwt:     JwtService,
    private readonly config:  ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (exists) throw new UnauthorizedException("Email already in use");

    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: { email: dto.email, passwordHash: hash, firstName: dto.firstName, lastName: dto.lastName, tenantId: dto.tenantId },
    });
    return this.issueTokens(user.id, user.tenantId, ["USER"]);
  }

  async validateUser(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash)))
      throw new UnauthorizedException("Invalid credentials");
    return this.issueTokens(user.id, user.tenantId, ["USER"]);
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwt.verify(token, { secret: this.config.get<string>("JWT_SECRET") });
      const session = await this.prisma.session.findUnique({ where: { token } });
      if (!session || session.expiresAt < new Date()) throw new Error();
      return { accessToken: this.jwt.sign({ sub: payload.sub, tenantId: payload.tenantId, role: payload.role }, { expiresIn: this.config.get("JWT_EXPIRES_IN") }) };
    } catch { throw new UnauthorizedException("Invalid refresh token"); }
  }

  private async issueTokens(userId: string, tenantId: string, role: string[]) {
    const accessToken  = this.jwt.sign({ sub: userId, tenantId, role }, { expiresIn: this.config.get("JWT_EXPIRES_IN") });
    const refreshToken = this.jwt.sign({ sub: userId, tenantId },       { expiresIn: this.config.get("REFRESH_TOKEN_EXPIRES_IN") });
    return { accessToken, refreshToken };
  }
}
