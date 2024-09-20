import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // Makes the ConfigModule globally available (optional)
  }),
    HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
