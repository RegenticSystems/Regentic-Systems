import { Module }      from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "@synapse/database";
import { AiController } from "./ai.controller";
import { AiService }    from "./ai.service";

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule],
  controllers: [AiController],
  providers:   [AiService],
})
export class AppModule {}
