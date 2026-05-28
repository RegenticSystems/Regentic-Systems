import { Injectable }   from "@nestjs/common";
import { PrismaService } from "@synapse/database";

@Injectable()
export class WorkflowService {
  constructor(private readonly prisma: PrismaService) {}
  // TODO: implement workflow business logic
}
