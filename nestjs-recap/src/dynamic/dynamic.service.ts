import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class DynamicService {
  constructor(private readonly message:string
    ){
    if(this.message){
      console.log("msg: ",this.message)
    }
  }

  getData(): string {
    return `Dynamic Service Data: ${this.message}`;
  }

  

}
