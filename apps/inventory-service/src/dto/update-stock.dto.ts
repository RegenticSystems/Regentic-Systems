import { IsNumber, IsString, IsOptional } from "class-validator";
export class UpdateStockDto {
  @IsNumber()              quantity: number;
  @IsString() @IsOptional() reason?: string;
}
