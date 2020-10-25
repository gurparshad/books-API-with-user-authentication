import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {BookSchema} from './book.model';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Book', schema: BookSchema}]),
            AuthModule,
            MulterModule.register({
              dest: './uploads',
            })
],
  providers: [BooksService],
  controllers: [BooksController]
})
export class BooksModule {
     
  }

