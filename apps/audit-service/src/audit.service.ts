import { Injectable }   from "@nestjs/common";
import { PrismaService } from "@synapse/database";

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}
  // TODO: implement audit business logic
}
