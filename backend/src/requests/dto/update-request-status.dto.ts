import { RequestStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRequestStatusDto {
  @ApiProperty({ enum: RequestStatus, example: RequestStatus.IN_PROGRESS })
  @IsEnum(RequestStatus)
  status!: RequestStatus;
}
