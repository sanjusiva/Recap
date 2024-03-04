import { forwardRef, Inject, Injectable, Req } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { AppService } from 'src/app.service';
import { LazyService } from 'src/lazy/lazy.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

let empList=[{
  "emp_name":"Sanjitha",
"emp_id":123,
"city":"Chennai"
}];

@Injectable()
export class EmployeeService {
  
  constructor(
    @Inject(forwardRef(() => AppService)) private appServe:AppService,
    // private lazyModuleLoader: LazyModuleLoader,
  // private service:LazyService
    ){}

  arrayList=[{
    "emp_name":"Sanjitha",
  "emp_id":123,
  "city":"Chennai"
  }]

  circular(){
    return this.appServe.greet();
  }

  create(createEmployeeDto: CreateEmployeeDto) {
    empList.push(createEmployeeDto)
    return 'Inserted Successfully';
  }

  findAll(@Req() request?: Request) {
    console.log("req: ",request)
    console.log("emp: ",empList)
    return empList;
  }

  findOne(id: number) {
    let data;
    empList.forEach((ele)=>{
      if(ele.emp_id==id){
      console.log("ele: ",ele.emp_id,id)
      data=ele
      }
    })
    return data?data:`Employee id: ${id} is not found in the list`;
  }

  update(id: number, updateEmployeeDto: CreateEmployeeDto) {
    let index = this.findIndex(empList, id);
    console.log("ind: ",index)
    empList[0]=updateEmployeeDto
    return empList[0];
  }

  remove(id: number) {
    let index = this.findIndex(empList, id);
    console.log("ind: ",index)
    let data;
    if(index!==-1){
      data=true;
      delete empList[index]
    }
    return data?`removed data of employee with id : ${id} `:`${id} not found`;
  }

  findIndex(array,field){
    return array.findIndex(obj => obj.emp_id === field);
  }

//   async callLazy() {
//     const { LazyModule } = await import('../lazy/lazy.module')
//     const moduleRef = await this.lazyModuleLoader.load(() => LazyModule) 
//     this.service = moduleRef.get(LazyService)
//     return this.service.lazyServiceFunc()
// }
}
