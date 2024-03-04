import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JWTAuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    console.log("user,psw: ",username,password)
    const user = await this.userService.findOne(username);
    console.log("user find: ",user)
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      console.log("user result: ",result)
      return result;
    }
    return null;
  }

  async login(user: any): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
  };
  }
}
