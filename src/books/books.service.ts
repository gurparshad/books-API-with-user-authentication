import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UUIDVersion } from 'class-validator';
import { Model } from 'mongoose';
import { title } from 'process';
import { Book } from './book.model';
import { BooksDto } from './books.dto';
const jwt = require("jsonwebtoken");

@Injectable()
export class BooksService {

    constructor(@InjectModel('Book') private readonly bookModel: Model<Book>,
    ){}

    async displayBooks(){
        try{
            return await this.bookModel.find({type: "public"})
        }catch(err){
            return err;
        }
    }

    async displayAllBooks(){
        try{
            console.log("inside display all books");
            return await this.bookModel.find();
        }catch(err){
            return err;
        }
    }

   async addBook(booksDto: BooksDto, req){
       const {title,description,cover,author,publicationDate,type} = booksDto;
       if(!title || !description || !author || !publicationDate || !type){
        return "Not all fields have been filled";
       }
           try{
            const newProduct = new this.bookModel({
                title: title,
                description: description,
                cover: cover,
                author: author,
                publicationDate: publicationDate,
                type:type,
                owner: req.user._id,
               });
               const result = await newProduct.save();
               console.log(result);
               return result;
           }catch(err){console.log(err)}     
           
       }

    async deleteBook(bookId){
        try{
            const bookDeleted = await this.bookModel.findByIdAndDelete(bookId);
            return bookDeleted;
        }catch(err){
            return err;
        }
    }

    async updateBookDetails(bookId, booksDto: BooksDto){
        try{
            const updatedBook = await this.bookModel.findById({_id: bookId});
            if(booksDto.title) updatedBook.title = booksDto.title;
            if(booksDto.description) updatedBook.description = booksDto.description;
            if(booksDto.author) updatedBook.author = booksDto.author;
            if(booksDto.publicationDate) updatedBook.publicationDate = booksDto.publicationDate;
            if(booksDto.type) updatedBook.type = booksDto.type;
            
            return await updatedBook.save();
            
        }catch(err){
            return err;
        }
    }

    async userVerification(req){
        
        const secret = process.env.JWT_SECRET;
            const headers = await req.headers['authorization'];
            if(headers){
                
                const token = headers.split(' ')[1];
                const result =  await jwt.verify(token, secret, (err, res) => {
                     if(err){
                         console.log("error occured",err);
                         return err;
                     } 
                    return res;
                 });
                 if(result.email){
                     return this.displayAllBooks();
                 }
            }else{
                return this.displayBooks();
            }
   
    }

    async addBookCover(file, bookId){
        const img = file.toString('base64');
        let finalImg = {
            contentType: file.mimetype,
            path: file.path,
            image: new Buffer(img, 'base64')
        };
        await this.bookModel.findOneAndUpdate({_id: bookId},{cover: finalImg.image});
        const updatedBook = await this.bookModel.findOne({_id: bookId});
        return updatedBook;
        
    }
}
