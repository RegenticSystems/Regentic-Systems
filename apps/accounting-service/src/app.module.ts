import { Module }      from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "@synapse/database";
import { AccountingController } from "./accounting.controller";
import { AccountingService }    from "./accounting.service";

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule],
  controllers: [AccountingController],
  providers:   [AccountingService],
})
export class AppModule {}
