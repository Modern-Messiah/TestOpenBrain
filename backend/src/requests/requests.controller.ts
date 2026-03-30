import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { QueryRequestsDto } from './dto/query-requests.dto';
import { UpdateRequestStatusDto } from './dto/update-request-status.dto';
import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestsService.create(createRequestDto);
  }

  @Get()
  findAll(@Query() query: QueryRequestsDto) {
    return this.requestsService.findAll(query.status);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.requestsService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRequestStatusDto: UpdateRequestStatusDto,
  ) {
    return this.requestsService.updateStatus(id, updateRequestStatusDto.status);
  }
}
