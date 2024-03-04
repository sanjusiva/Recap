//3 things are important for exception filter
/*
1. @Catch(HttpException)
2. implements ExceptionFilter
3. catch(exception: HttpException, host: ArgumentsHost){} 
*/

import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ExceptionFilterClass implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log("exception Filter")
    const ctx = host.switchToHttp();//extracts the HTTP-related objects from the host context
    const status = exception.getStatus();//gets the HTTP status code from the thrown exception
    const response = ctx.getResponse<Response>();//retrieves the HTTP response object
    const message =  'Something went wrong';
    response.status(status).json({
        statusCode: status,
        message,
      });//"statusCode": 500,"message": "Internal server error"
  }
}
/*
to apply this exception globally,In app module
    @Module({
    providers: [
    {
      provide: APP_FILTER,
      useClass: MyExceptionFilter,
    },
  ],
})
*/
/*
to apply them locally,in controller(route handler)
@UseFilters(ExceptionFilterClass)
*/