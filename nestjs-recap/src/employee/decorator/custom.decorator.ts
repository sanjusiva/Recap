import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Employee=createParamDecorator(
    (data:string,ctx:ExecutionContext)=>{
        let req=ctx.switchToHttp().getRequest()
        console.log('res: ',req.params)
        let paramsKey=Object.keys(req.params)
        let result;
        req.employee.forEach((ele)=>{
            Object.entries(ele).forEach(([key,val])=>{
                console.log(key,val)
                if(paramsKey[0]==='id' && req.params.id==ele[key]){
                    result=ele['emp_name']
                }
            })
           
        })
        return result?result:'Not found'
    }
)