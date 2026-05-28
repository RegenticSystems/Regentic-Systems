import { Controller, Get } from "@nestjs/common";
import { AdminService }   from "./admin.service";
import { ApiTags }          from "@nestjs/swagger";

@ApiTags("admin")
@Controller("admin")
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @Get("health")
  health() { return { status: "ok" }; }
}
