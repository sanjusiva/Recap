import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { LazyModuleLoader, ModuleRef, REQUEST } from '@nestjs/core';
import { EmployeeService } from './employee/employee.service';
import { LazyService } from './lazy/lazy.service';
@Injectable()
export class AppService implements OnModuleInit{
  constructor( @Inject(REQUEST) private request: Request,
  @Inject(forwardRef(() => EmployeeService)) private emp:EmployeeService,
  private moduleRef: ModuleRef,
  ){}
  async onModuleInit() {
    const transientServices = await Promise.all([
      this.moduleRef.resolve(EmployeeService),
      this.moduleRef.resolve(EmployeeService),
    ]);
    console.log("Module Init",transientServices[0] === transientServices[1]); // false
  }
  getHello(): string {
    return 'Hello World!';
  }
  greet(){
    return 'Hi,this a msg';
  }
  scopeUse(){
    return this.request.headers;
  }
  circular(){
    return this.emp.circular();
  }
  
}
