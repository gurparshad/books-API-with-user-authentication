import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config/dist/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({

  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true
    // }),
    AuthModule,
    BooksModule,
    MongooseModule.forRoot(process.env.DB),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
