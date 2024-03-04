import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { request } from 'https';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('In side middleware');
    req['employee']=[{"emp_name":"Sanjitha",
    "emp_id":123,
    "city":"Chennai"}]
    next();
  }
}
