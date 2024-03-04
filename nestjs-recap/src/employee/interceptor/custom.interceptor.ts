/*
Interceptor implements NestInterceptor interface
It has two methods: intercept and handleRequest
intercept:called before sending the request to a controller
handleRequest:called after the request has been processed by the controller and a response is returned

intercept method takes 2 arguments:ExecutionContext and CallHandler
ExecutionContext:object that provides methods to access the route handler
CallHandler:interface that provides access to an Observable, which represents the response stream from the route handler
*/

import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { CreateEmployeeDto } from "../dto/create-employee.dto";

export class CustomInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        
        //using  context.switchToHttp().getRequest() => we can change value before sending the request to a controller
        const request = context.switchToHttp().getRequest();
        console.log("before req",request.params.id)


        console.log('Before...');
        return next.handle().pipe(
          map((data) =>
            data.map((item: CreateEmployeeDto) => {
              console.log('After....');
              const res = {
                ...item,
                empName: item.emp_name,
                empId: item.emp_id,
              };
              delete res.emp_name, delete res.emp_id;
              return res;
            }),
          ),
        );
    }
}