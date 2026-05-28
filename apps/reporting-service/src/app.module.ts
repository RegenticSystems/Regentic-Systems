import { Module }      from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "@synapse/database";
import { ReportingController } from "./reporting.controller";
import { ReportingService }    from "./reporting.service";

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule],
  controllers: [ReportingController],
  providers:   [ReportingService],
})
export class AppModule {}
