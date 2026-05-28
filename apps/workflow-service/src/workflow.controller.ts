import { Controller, Get } from "@nestjs/common";
import { WorkflowService }   from "./workflow.service";
import { ApiTags }          from "@nestjs/swagger";

@ApiTags("workflow")
@Controller("workflow")
export class WorkflowController {
  constructor(private readonly service: WorkflowService) {}

  @Get("health")
  health() { return { status: "ok" }; }
}
