import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';

@Injectable()
export class RequestsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createRequestDto: CreateRequestDto) {
    return this.prisma.request.create({
      data: createRequestDto,
    });
  }

  findAll(status?: RequestStatus) {
    return this.prisma.request.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const request = await this.prisma.request.findUnique({
      where: { id },
    });

    if (!request) {
      throw new NotFoundException(`Request with id ${id} not found`);
    }

    return request;
  }

  async updateStatus(id: string, status: RequestStatus) {
    await this.findOne(id);

    return this.prisma.request.update({
      where: { id },
      data: { status },
    });
  }
}
