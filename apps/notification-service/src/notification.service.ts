import { Injectable }   from "@nestjs/common";
import { PrismaService } from "@synapse/database";

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}
  // TODO: implement notification business logic
}
