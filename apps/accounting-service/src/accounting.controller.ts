import { Controller, Get } from "@nestjs/common";
import { AccountingService }   from "./accounting.service";
import { ApiTags }          from "@nestjs/swagger";

@ApiTags("accounting")
@Controller("accounting")
export class AccountingController {
  constructor(private readonly service: AccountingService) {}

  @Get("health")
  health() { return { status: "ok" }; }
}
