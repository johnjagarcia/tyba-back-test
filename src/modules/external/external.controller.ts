import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ExternalService } from './external.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/domain')
export class ExternalController {
  constructor(private readonly externalService: ExternalService) {}

  @Get('search')
  @UseGuards(AuthGuard())
  async create(@Query('domain') domain: string) {
    return this.externalService.getDomains(domain);
  }
}
