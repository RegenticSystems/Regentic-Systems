import { Injectable }   from "@nestjs/common";
import { PrismaService } from "@synapse/database";

@Injectable()
export class AiService {
  constructor(private readonly prisma: PrismaService) {}
  // TODO: implement ai business logic
}
