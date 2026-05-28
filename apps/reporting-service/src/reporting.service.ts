import { Injectable }   from "@nestjs/common";
import { PrismaService } from "@synapse/database";

@Injectable()
export class ReportingService {
  constructor(private readonly prisma: PrismaService) {}
  // TODO: implement reporting business logic
}
