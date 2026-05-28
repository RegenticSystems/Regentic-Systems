import { Controller, Get } from "@nestjs/common";
import { InvoiceService }   from "./invoice.service";
import { ApiTags }          from "@nestjs/swagger";

@ApiTags("invoice")
@Controller("invoice")
export class InvoiceController {
  constructor(private readonly service: InvoiceService) {}

  @Get("health")
  health() { return { status: "ok" }; }
}
