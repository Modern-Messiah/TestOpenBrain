import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRequestDto {
  @ApiProperty({ example: 'Не приходит уведомление в Telegram' })
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  title!: string;

  @ApiProperty({ example: 'Иван Петров' })
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  clientName!: string;

  @ApiPropertyOptional({ example: 'client@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '+77015551234' })
  @IsOptional()
  @IsString()
  @Matches(/^\+?[0-9()\-\s]{7,20}$/)
  phone?: string;

  @ApiPropertyOptional({ example: 'После обновления перестали приходить пуши' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;
}
