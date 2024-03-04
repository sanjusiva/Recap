import { Controller, Get, Post, Body, Put, Param, Delete, Req, HttpCode, HttpException, HttpStatus, BadRequestException, UseFilters, ParseIntPipe, UsePipes, Query, DefaultValuePipe, ParseBoolPipe, UseGuards, UseInterceptors } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { CustomException } from './exception/custom.exception';
import { ExceptionFilterClass } from './exception/exception.filter';
import { UpperCaseClass } from './pipe/upperCase.pipe';
import { City } from './auth/location.decorator';
import { LocationGuard } from './auth/location.guard';
import { CustomInterceptor } from './interceptor/custom.interceptor';
import { Employee } from './decorator/custom.decorator';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  @UseInterceptors(CustomInterceptor)
  findAll(@Req() request: Request):CreateEmployeeDto[] {
    return this.employeeService.findAll(request);
  }

  @Get('decorator/:id')
  decoratorUsage(@Employee()emp_name:string){
    return `This id belongs to employee : ${emp_name}`
  }

  @Get('err')
  errorCheck (@Req() request: Request) {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);// "statusCode": 403,"message": "Forbidden"

      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN, 
      {
        cause: 'error'//3rd params is optional
      }); //"status": 403,"error": "This is a custom message"
  }

  @Get('custom')
  customException(){
    throw new CustomException();//"statusCode": 403,"message": "This route is Forbidden"
    // throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })
    /* "message": "Something bad happened",
    "error": "Some error description",
    "statusCode": 400*/ 
  }

  @UseFilters(ExceptionFilterClass)
  @Get('exceptionFilter')
  exceptionFilter(){
    console.log("controller exception filter route handler")
    // throw new ExceptionFilterClass()
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @UsePipes(UpperCaseClass)
  @Get('change/:data')//http://localhost:3000/employee/change/mom
  pipeUsage(@Param('data') value: string){
    return `Transformed value: ${value}`
  }

  @Get('auth')
  @City('Chennai')
  @UseGuards(LocationGuard)
  guardUsage(){
    return 'This message is only for certain people.'
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: string) {//build-in pipes
    return this.employeeService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  @HttpCode(202)
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }

  // @Get('lazy')
  // callLazy(){
  //   return this.employeeService.callLazy();
  // }

}
