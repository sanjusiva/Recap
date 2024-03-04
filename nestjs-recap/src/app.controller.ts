import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('MY_CONFIG') private readonly myConfig: any,
    @Inject('DYNAMIC_CONFIG') private readonly dynamicConfig: any,
    @Inject('ALIAS') private readonly alias: any,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('uv')
  useValueUsage() {
    return this.myConfig.apiKey;
  }
  @Get('uf')
  useFactoryUsage() {
    return this.dynamicConfig.apiKey;
  }
  @Get('ue')
  useExistingUsage() {
    return this.alias.greet();
  }
  @Get('scope')
  scopeUsage(){
    return this.appService.scopeUse();
  }
  @Get('cd')
  circularUsage(){
    return this.appService.circular();
  }
  @Get('m*m')
  findAllMatch() {
    return 'This route uses a wildcard';
  }
}
