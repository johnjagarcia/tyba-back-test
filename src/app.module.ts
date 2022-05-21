import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExternalModule } from './modules/external/external.module';
import { UserModule } from './modules/user/user.module';

const url = process.env.MONGO_URL || 'localhost';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${url}:27017/tyba`, {
      useNewUrlParser: true,
    }),
    UserModule,
    ExternalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
