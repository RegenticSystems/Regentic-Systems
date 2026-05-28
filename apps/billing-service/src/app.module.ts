import { Module }      from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "@synapse/database";
import { BillingController } from "./billing.controller";
import { BillingService }    from "./billing.service";

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule],
  controllers: [BillingController],
  providers:   [BillingService],
})
export class AppModule {}
