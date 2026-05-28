import { IsString, IsNotEmpty, IsNumber, Min } from "class-validator";
export class InventoryTransferDto {
  @IsString() @IsNotEmpty() fromWarehouseId: string;
  @IsString() @IsNotEmpty() toWarehouseId:   string;
  @IsString() @IsNotEmpty() productId:        string;
  @IsNumber()  @Min(1)      quantity:          number;
}
