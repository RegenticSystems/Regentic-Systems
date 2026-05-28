import { Module }      from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "@synapse/database";
import { NotificationController } from "./notification.controller";
import { NotificationService }    from "./notification.service";

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule],
  controllers: [NotificationController],
  providers:   [NotificationService],
})
export class AppModule {}
