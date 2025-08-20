import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'amroAbgr12-=',
    });
  }

  async validate(user: any) {
    const validateUser = await this.usersService.findOne(user.email);
    if (!validateUser) {
      throw new UnauthorizedException('User Not Fonund');
    }
    return validateUser;
  }
}