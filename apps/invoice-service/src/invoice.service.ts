import { Injectable }   from "@nestjs/common";
import { PrismaService } from "@synapse/database";

@Injectable()
export class InvoiceService {
  constructor(private readonly prisma: PrismaService) {}
  // TODO: implement invoice business logic
}
