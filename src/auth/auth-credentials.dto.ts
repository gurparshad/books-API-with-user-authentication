import { MinLength , MaxLength, Matches} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto{
    @ApiProperty({
        type: String,
        description: "first name of the user",
        default: '',
    })
    firstName: string;

    @ApiProperty({
        type: String,
        description: "Last name of the user",
        default: '',
    })
    lastName: string;

    @ApiProperty({
        type: String,
        description: "Email of the user",
        default: '',
    })
    @MinLength(5, {
        message: 'Lenght of email must be greater then or equal to 5'
    })
    @Matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, {
        message: 'enter a valid email.'
    })
    email: string;

    @ApiProperty({
        type: String,
        description: "password for your account",
        default: '',
    })
    @MinLength(8, {
        message: 'Lenght of password must be greater then or equal to 8'
    })
    @MaxLength(50)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/, {
        message: 'Password must contain atleast one Uppercase letter, one Lowercase letter, one number and one special char.'
    })
    password: string;

    @ApiProperty({
        type: String,
        description: "confirm your password",
        default: '',
    })
    confirmPassword: string;
}
