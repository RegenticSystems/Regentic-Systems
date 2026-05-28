import { IsString, IsNotEmpty, IsNumber, Min, IsOptional } from "class-validator";
export class CreateProductDto {
  @IsString() @IsNotEmpty() sku: string;
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsOptional() description?: string;
  @IsNumber()  @Min(0)      price: number;
}
