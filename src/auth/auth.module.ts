import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { JwtModule} from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: 3600,
        },
      }),
    ],  
  controllers: [AuthController],
  providers: [AuthService,
              JwtStrategy,
            PassportModule],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {}
