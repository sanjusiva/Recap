import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { AuthModule } from './auth/auth.module';
import { AppService } from 'src/app.service';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService,AppService],
  imports: [AuthModule],
})
export class EmployeeModule {}
