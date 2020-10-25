import { Body, Controller, Get, Param, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { AuthService } from './auth.service';
import { ApiTags, ApiBearerAuth} from '@nestjs/swagger';

@ApiTags('user')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService ){}

    @Post('/register')
    @ApiBearerAuth()
    async register(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto){
        const result = await this.authService.register(authCredentialsDto);
        return { user: result };
    }

    @Post('/login')
    @ApiBearerAuth()
    async login(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto){
        const token = await this.authService.login(authCredentialsDto);
        return {result: token};
    }   

    @Post('/resetPassword/:code')
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async resetPassword(
        @Param('code') code: string,
        @Body('newPassword') newPass: string,
        @Req() req
    ){
        const result = await this.authService.resetPassword(req.user,newPass, code);
        return {passwordChanged: result}
    }

    @Get('/resetPassword')
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async resetPasswordCode(){
        const resetPassCode = await this.authService.resetPasswordCode();
        return {code: resetPassCode};
    }

}
