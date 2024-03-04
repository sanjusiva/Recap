import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWTAuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secret_key_aspire',
      // signOptions: { expiresIn: '1h' }, 
    }),
    UserModule,
  ],
  providers: [JWTAuthService, LocalStrategy, JwtStrategy],
  exports: [JWTAuthService],
})
export class JWTAuthModule {}
