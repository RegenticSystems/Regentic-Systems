import { Controller, Get } from "@nestjs/common";
import { AuditService }   from "./audit.service";
import { ApiTags }          from "@nestjs/swagger";

@ApiTags("audit")
@Controller("audit")
export class AuditController {
  constructor(private readonly service: AuditService) {}

  @Get("health")
  health() { return { status: "ok" }; }
}
