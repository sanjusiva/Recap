/*
1.Guards are used for authorization
2.In express authorization is handled by middleware.
3.But middleware doesn't know which handler will be executed after calling the next() function.
4.But Guards have access to the ExecutionContext instance, and thus know exactly what's going to be executed next
5.Guards are executed after all middleware, but before any interceptor or pipe.
6.controller-scoped guard using the @UseGuards() decorator.
7.In order to set up a global guard, use the useGlobalGuards() method of the Nest application instance:
*/

/*
thing important for guard
@Injectable 
1.implements CanActivate
2.constructor(private reflector:Reflector){}
3.canActivate(context: ExecutionContext): boolean{
*/

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core";

@Injectable()
export class LocationGuard implements CanActivate{
    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean{
      console.log("context: ",context)
        const city = this.reflector.get<string[]>('city', context.getHandler());
        console.log("inside guard: ",city)
    if (!city) {
      console.log("inside if")
      return true; 
    }
    const request = context.switchToHttp().getResponse();
    console.log("req: ",request)
    const user = request.user;
    console.log("user: ",user)
    // return city.some(place => user.city?.includes(place));
    return city.some(place => place==='Chennai');//as of now we are just letting it true,TODO:jwt strategy 
    }
}