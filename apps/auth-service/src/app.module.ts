import { Module }      from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "@synapse/database";
import { AuthController } from "./auth.controller";
import { AuthService }    from "./auth.service";

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule],
  controllers: [AuthController],
  providers:   [AuthService],
})
export class AppModule {}
