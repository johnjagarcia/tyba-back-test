import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ExternalController } from './external.controller';
import { ExternalService } from './external.service';

@Module({
  imports: [HttpModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [ExternalService],
  controllers: [ExternalController],
})
export class ExternalModule {}
