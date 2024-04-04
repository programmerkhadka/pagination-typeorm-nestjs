import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly slug: string;

  @IsBoolean()
  @IsOptional()
  readonly show_on_dropdown: boolean;
}
