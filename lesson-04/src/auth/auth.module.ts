import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';

// secret->token -  salt->Password
// type Years = 'years' | 'year' | 'yrs' | 'yr' | 'y'
// type Months = 'months' | 'month' | 'mo'
// type Weeks = 'weeks' | 'week' | 'w'
// type Days = 'days' | 'day' | 'd'
// type Hours = 'hours' | 'hour' | 'hrs' | 'hr' | 'h'
// type Minutes = 'minutes' | 'minute' | 'mins' | 'min' | 'm'
// type Seconds = 'seconds' | 'second' | 'secs' | 'sec' | 's'
// type Milliseconds = 'milliseconds' | 'millisecond' | 'msecs' | 'msec' | 'ms'
// type Unit = Years | Months | Weeks | Days | Hours | Minutes | Seconds | Milliseconds

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Users]),
    PassportModule,
    JwtModule.register({
      secret: 'amroAbgr12-=',
      signOptions: { 
        expiresIn: '1d' //d h days hours weeks w 1d 32h 4weeks m // ignored it jwt Strategy ignoreExpiration set to true
      }
    })
    ],
  controllers: [AuthController],
  // jwt strategy
  providers: [
    UsersService,
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
})
export class AuthModule {}
