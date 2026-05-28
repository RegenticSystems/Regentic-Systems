import { Injectable }   from "@nestjs/common";
import { PrismaService } from "@synapse/database";

@Injectable()
export class BillingService {
  constructor(private readonly prisma: PrismaService) {}
  // TODO: implement billing business logic
}
