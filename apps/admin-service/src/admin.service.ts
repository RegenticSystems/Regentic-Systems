import { Injectable }   from "@nestjs/common";
import { PrismaService } from "@synapse/database";

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}
  // TODO: implement admin business logic
}
