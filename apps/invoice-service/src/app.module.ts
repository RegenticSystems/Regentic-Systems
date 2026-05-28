import { Module }      from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "@synapse/database";
import { InvoiceController } from "./invoice.controller";
import { InvoiceService }    from "./invoice.service";

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule],
  controllers: [InvoiceController],
  providers:   [InvoiceService],
})
export class AppModule {}
