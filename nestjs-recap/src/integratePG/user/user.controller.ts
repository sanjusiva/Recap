import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './auth/role.decorator';
import { RolesGuard } from './auth/role.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin') 
  @Get('profile')
  getProfile(@Request() req) {
    console.log("profile: ",req.user)
    return req.user;
  }

  @Post('register')
  async register(@Request() req) {
    const { username, password,role } = req.body;
    const user = await this.userService.findOne(username);

    if (user) {
      return { message: 'User already exists' };
    }

    const newUser = await this.userService.create({ username, password,role });
    return { message: 'User registered successfully', user: newUser };
  }

  @Post('login')
  async login(@Request() req) {
    const { username, password } = req.body;
    console.log("req: ",req.body)
    return this.userService.login(req.body);
  }
}
