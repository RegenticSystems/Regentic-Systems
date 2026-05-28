import { Controller, Get } from "@nestjs/common";
import { BillingService }   from "./billing.service";
import { ApiTags }          from "@nestjs/swagger";

@ApiTags("billing")
@Controller("billing")
export class BillingController {
  constructor(private readonly service: BillingService) {}

  @Get("health")
  health() { return { status: "ok" }; }
}
