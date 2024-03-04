import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LocationGuard } from './employee/auth/location.guard';
import { EmployeeService } from './employee/employee.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new LocationGuard());
  await app.listen(3000);
}
bootstrap();
