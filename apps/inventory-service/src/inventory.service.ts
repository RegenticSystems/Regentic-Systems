import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService }                 from "@synapse/database";

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(data: { tenantId: string; sku: string; name: string; description?: string; price: number }) {
    const exists = await this.prisma.product.findFirst({ where: { tenantId: data.tenantId, sku: data.sku } });
    if (exists) throw new Error("SKU already exists for this tenant");
    return this.prisma.product.create({ data });
  }

  async listProducts(tenantId: string) {
    return this.prisma.product.findMany({ where: { tenantId }, include: { stock: true } });
  }

  async adjustStock(tenantId: string, productId: string, quantityDelta: number) {
    const stock = await this.prisma.stock.findFirst({ where: { tenantId, productId } });
    if (!stock) throw new NotFoundException("Stock record not found");
    const newQty = stock.quantity + quantityDelta;
    if (newQty < 0) throw new Error("Insufficient stock");
    return this.prisma.stock.update({ where: { id: stock.id }, data: { quantity: newQty } });
  }

  async transferStock(tenantId: string, fromWarehouseId: string, toWarehouseId: string, productId: string, quantity: number) {
    const from = await this.prisma.stock.findFirst({ where: { tenantId, productId, warehouseId: fromWarehouseId } });
    if (!from || from.quantity < quantity) throw new Error("Insufficient source stock");
    let to = await this.prisma.stock.findFirst({ where: { tenantId, productId, warehouseId: toWarehouseId } });
    if (!to) to = await this.prisma.stock.create({ data: { tenantId, productId, warehouseId: toWarehouseId, quantity: 0 } });
    return this.prisma.$transaction([
      this.prisma.stock.update({ where: { id: from.id }, data: { quantity: { decrement: quantity } } }),
      this.prisma.stock.update({ where: { id: to.id },   data: { quantity: { increment: quantity } } }),
    ]);
  }
}
