import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import * as usersEntity from 'src/users/users.entity';
import { isMapIterator } from 'util/types';


@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService) { }

  async login(user: any) {
    const loginUser = { email: user.email, role: user.role }
    return {
      access_token: this.jwtService.sign(loginUser),
    }
  }
  
  async register(user: any) {
    try {
      const hashpassword = await bcrypt.hash(user.password, 10);
      return this.userService.create({ ...user, password: hashpassword });
    } catch (error) {
      return { error: error };
    }
  }

  async validate(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user[0].password);
      if (isMatch) {
        return user;
      }
    }
  }
}
