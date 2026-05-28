import { Module }      from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "@synapse/database";
import { AuditController } from "./audit.controller";
import { AuditService }    from "./audit.service";

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule],
  controllers: [AuditController],
  providers:   [AuditService],
})
export class AppModule {}
