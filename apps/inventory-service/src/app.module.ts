import { Module }      from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "@synapse/database";
import { InventoryController } from "./inventory.controller";
import { InventoryService }    from "./inventory.service";

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule],
  controllers: [InventoryController],
  providers:   [InventoryService],
})
export class AppModule {}
