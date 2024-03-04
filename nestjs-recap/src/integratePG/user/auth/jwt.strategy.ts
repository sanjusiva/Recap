import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTAuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: JWTAuthService) {
    console.log("JWT")
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret_key_aspire',
    });
  }

  async validate(payload: any): Promise<any> {
    console.log("jwt validate: ",payload)
    const user = await this.authService.validateUser(payload.username, payload.password);
    console.log("jwt result: ",user)
    if (!user || user.role !== 'admin') {
      throw new UnauthorizedException('Invalid token');
    }
  
    return user;
  }
}
