import { Module }      from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "@synapse/database";
import { WorkflowController } from "./workflow.controller";
import { WorkflowService }    from "./workflow.service";

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule],
  controllers: [WorkflowController],
  providers:   [WorkflowService],
})
export class AppModule {}
