import { Controller, Get } from "@nestjs/common";
import { AiService }   from "./ai.service";
import { ApiTags }          from "@nestjs/swagger";

@ApiTags("ai")
@Controller("ai")
export class AiController {
  constructor(private readonly service: AiService) {}

  @Get("health")
  health() { return { status: "ok" }; }
}
