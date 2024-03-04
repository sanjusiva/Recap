import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './employee/auth/auth.module';
import { EmployeeController } from './employee/employee.controller';
import { EmployeeModule } from './employee/employee.module';
import { LogMiddleware } from './employee/middleware/log';
import { DynamicModuleClass } from './dynamic/dynamic.module';
import { DynamicController } from './dynamic/dynamic.controller';
import { EmployeeService } from './employee/employee.service';
import { DynamicService } from './dynamic/dynamic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './integratePG/dbConfig';
import { PostModule } from './integratePG/post.module';
import { PostController } from './integratePG/post.controller';
import { PostService } from './integratePG/post.service';
import { Post } from './integratePG/post.entity';
import { UserModule } from './integratePG/user/user.module';
import { JWTAuthModule } from './integratePG/user/auth/auth.module';
import { User } from './integratePG/user/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

const myConfig = {
  apiKey: 'your-api-key',
  apiUrl: 'https://api.example.com',
};

const dynamicConfig = (apiKey: string, apiUrl: string) => ({
  apiKey,
  apiUrl,
});


@Module({
  imports: [EmployeeModule, AuthModule, 
    DynamicModuleClass.register({ isEnabled: true }),
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Post]),
    TypeOrmModule.forFeature([User]),
    JWTAuthModule,
    UserModule,
    ThrottlerModule.forRoot([{
      ttl : 1000,
      limit : 1,
   }]),
    PostModule,
  ],
  controllers: [AppController,DynamicController,PostController],
  providers: [
    AppService,EmployeeService,PostService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: 'ALIAS',
      useExisting: AppService
    },
    {
      provide: 'MY_CONFIG',
      useValue: myConfig,
    },
    {
      provide: 'DYNAMIC_CONFIG',
      useFactory: () => dynamicConfig('dynamic-key', 'https://api.example.com'),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogMiddleware) //to use multiple middleware put comma and add more middleware
      .exclude({ path: 'employee', method: RequestMethod.POST })
      .forRoutes(EmployeeController);
  }
}
