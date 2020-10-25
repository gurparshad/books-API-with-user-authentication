import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {User}  from './user.model';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { AuthCredentialsDto } from './auth-credentials.dto';


@Injectable()
export class AuthService {
    constructor( @InjectModel('User') private readonly userModel: Model<User>,
        private jwtService: JwtService,){}


        async register(authCredentialsDto: AuthCredentialsDto){
            const {firstName, lastName, email, password, confirmPassword} = authCredentialsDto;
            if(!firstName || !lastName || !email || !password || !confirmPassword)
                return "Not all fields have been filled";
            if(password !== confirmPassword)
                return "password and confirmPassword fields not same";
        
            const saltRounds = 10;
            const hashedValue = await bcrypt.hash(password, saltRounds);
            
            const newUser = new this.userModel({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedValue
            });
            try{
                const result = await newUser.save();
            console.log(result);
            return result;
            } catch(err){
                if(err.keyValue.email){
                    console.log(err);
                return "user already exsits"}
                return err;
                }
                
                
        }
    
    async login(authCredentialsDto: AuthCredentialsDto){
        try{
            const {email, password} = authCredentialsDto;
            const user = await this.userModel.findOne({email: email});
            if(!user)
                return  "No account with this email found.";
            
            const isMatch = await bcrypt.compare(password, user.password); 
            console.log("ismatch", isMatch);
            if(!isMatch) return "invalid credentials";
    
            console.log("success", user);
    
            const payload: JwtPayload = {email};
            const accessToken = await this.jwtService.sign(payload);
            return accessToken;

        }catch(err){return err}
 
    }

    async resetPasswordCode(){
        return process.env.PASSWORD_RESET_CODE;
    }

    async resetPassword(user, newPass, code){
        console.log("insie service", user._id);
        if(code !== process.env.PASSWORD_RESET_CODE)
            return "code is incorrect";
        const res = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/.test(newPass);
        if(!res){
            return "Password must contain atleast one Uppercase letter, one Lowercase letter, one number and one special char.";
        }
        const saltRounds = 10;
        const hashedValue = await bcrypt.hash(newPass, saltRounds);
        await this.userModel.update({_id: user._id}, {password: hashedValue});
        
        const updatedUser = await this.userModel.findOne({_id: user._id});
        console.log("updated", updatedUser);
        return updatedUser;
        
    }

    async findOne(
        email: string,
    ){
        const user = await this.userModel.findOne({email: email});
        if(!user)
            return  "No account with this email found.";

        return user;
    }


}
