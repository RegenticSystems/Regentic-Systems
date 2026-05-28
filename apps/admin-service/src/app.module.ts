import { Module }      from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "@synapse/database";
import { AdminController } from "./admin.controller";
import { AdminService }    from "./admin.service";

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule],
  controllers: [AdminController],
  providers:   [AdminService],
})
export class AppModule {}
