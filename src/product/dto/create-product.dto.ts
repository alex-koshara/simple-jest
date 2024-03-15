import { Type } from 'class-transformer';
import { IsNumber, IsString, IsOptional, ValidateNested, IsArray } from 'class-validator';

class ProductCharacteristicDTO {
  name: string;

  value: string;
}

export class CreateProductDTO {
  @IsString()
  image: string;

  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  oldPrice?: number;

  @IsNumber()
  credit: number;

  @IsString()
  description: string;

  @IsString()
  advantages: string;

  @IsString()
  disadvantages: string;

  @IsArray()
  @IsString({ each: true })
  categories: string[];

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsArray()
  @ValidateNested()
  @Type(() => ProductCharacteristicDTO)
  characteristics: ProductCharacteristicDTO[];
}
