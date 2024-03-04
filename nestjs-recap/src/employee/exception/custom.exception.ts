import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomException extends HttpException{
    constructor(){
        super('This route is Forbidden', HttpStatus.FORBIDDEN)
    }
}