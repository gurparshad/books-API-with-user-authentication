import { ApiProperty } from '@nestjs/swagger';

export class BooksDto{

    @ApiProperty({
        type: String,
        description: "title of the book",
        default: '',
    })
    title: string;

    @ApiProperty({
        type: String,
        description: "description of the book",
        default: '',
    })
    description: string;

    @ApiProperty({
        type: Buffer,
        description: "cover of the book",
        default: '',
    })
    cover: Buffer;

    @ApiProperty({
        type: String,
        description: "author of the book",
        default: '',
    })
    author: string;

    @ApiProperty({
        type: String,
        description: "publicationDate of the book",
        default: '',
    })
    publicationDate: Date;

    @ApiProperty({
        type: String,
        description: "type of the book",
        default: '',
    })
    type: string;
}