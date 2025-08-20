import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'amroAbgr12-=',
      signOptions: { 
        expiresIn: '1d'
      }
    }),
    UsersModule],
  controllers: [AuthController],
  // jwt strategy
  providers: [
    AuthService,
    LocalStrategy
  ],
})
export class AuthModule {}
