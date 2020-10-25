import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BooksDto } from './books.dto';
import { BooksService } from './books.service';
import * as mongoose from 'mongoose';
import { ApiTags, ApiOkResponse, ApiBearerAuth} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';


@ApiTags('user')
@Controller('books')
export class BooksController {
 constructor(private readonly booksService: BooksService){}

 @Get('displayBooks')
 @ApiBearerAuth()
    async displayBooks(@Req() req){
       const result =  await this.booksService.userVerification(req);
       return {result: result};
    }


 @Post('/addBook')
 @ApiBearerAuth()
 @UseGuards(AuthGuard())
 async addBook(@Body() booksDto: BooksDto,
               @Req() req,
            ){
         const book = await this.booksService.addBook(booksDto, req);
         return { result : book};
     }

    
    @Delete('/deleteBook/:bookId')
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async deleteBook(
        @Param('bookId') bookId: mongoose.Schema.Types.ObjectId,
    ){
       const result =  await this.booksService.deleteBook(bookId);
        return {bookDeleted: result};
    }

    
    @Patch('/updateBookDetails/:bookId')
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async updateBook(
        @Param('bookId') bookId: mongoose.Schema.Types.ObjectId,
        @Body() booksDto: BooksDto,
    ){
        const result = await this.booksService.updateBookDetails(bookId, booksDto);
        return {bookDetailsUpdated: result}
    }

    @Post('/BookCoverPhoto/:bookId')
    @UseGuards(AuthGuard())
    @UseInterceptors(FileInterceptor('file'))
    async addBookPhoto(@UploadedFile() file, @Param('bookId') bookId: mongoose.Schema.Types.ObjectId){
        const result = await this.booksService.addBookCover(file, bookId);
        return {result: result};
    }

}
