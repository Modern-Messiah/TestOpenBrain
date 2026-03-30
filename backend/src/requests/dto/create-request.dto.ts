import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRequestDto {
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  title!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(120)
  clientName!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+?[0-9()\-\s]{7,20}$/)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;
}
