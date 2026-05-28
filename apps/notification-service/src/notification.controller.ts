import { Controller, Get } from "@nestjs/common";
import { NotificationService }   from "./notification.service";
import { ApiTags }          from "@nestjs/swagger";

@ApiTags("notification")
@Controller("notification")
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @Get("health")
  health() { return { status: "ok" }; }
}
