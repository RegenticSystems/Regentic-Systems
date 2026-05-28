import { Controller, Get } from "@nestjs/common";
import { ReportingService }   from "./reporting.service";
import { ApiTags }          from "@nestjs/swagger";

@ApiTags("reporting")
@Controller("reporting")
export class ReportingController {
  constructor(private readonly service: ReportingService) {}

  @Get("health")
  health() { return { status: "ok" }; }
}
