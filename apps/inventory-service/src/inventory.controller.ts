import { Controller, Get, Post, Body, Param, UseGuards, Request } from "@nestjs/common";
import { InventoryService }    from "./inventory.service";
import { CreateProductDto }    from "./dto/create-product.dto";
import { UpdateStockDto }      from "./dto/update-stock.dto";
import { InventoryTransferDto } from "./dto/inventory-transfer.dto";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("inventory")
@Controller("inventory")
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @Post("products")
  createProduct(@Body() dto: CreateProductDto, @Request() req) {
    return this.service.createProduct({ ...dto, tenantId: req.user?.tenantId ?? "default" });
  }

  @Get("products")
  listProducts(@Request() req) { return this.service.listProducts(req.user?.tenantId ?? "default"); }

  @Post("stock/:productId/adjust")
  adjustStock(@Param("productId") id: string, @Body() dto: UpdateStockDto, @Request() req) {
    return this.service.adjustStock(req.user?.tenantId ?? "default", id, dto.quantity);
  }

  @Post("transfer")
  transferStock(@Body() dto: InventoryTransferDto, @Request() req) {
    return this.service.transferStock(req.user?.tenantId ?? "default", dto.fromWarehouseId, dto.toWarehouseId, dto.productId, dto.quantity);
  }
}
