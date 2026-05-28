import { Injectable }   from "@nestjs/common";
import { PrismaService } from "@synapse/database";

@Injectable()
export class AccountingService {
  constructor(private readonly prisma: PrismaService) {}
  // TODO: implement accounting business logic
}
