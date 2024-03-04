import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
    constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
    ) {}
  
    async findOne(username: string): Promise<User | undefined> {
      return this.userRepository.findOne({ where: { username } });
    }
  
    async create(userData: { username: string; password: string,role: string }): Promise<User> {
      const { username, password,role } = userData;
  
      const existingUser = await this.findOne(username);
      if (existingUser) {
        throw new ConflictException('Username already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({ username, password: hashedPassword,role });
    return await this.userRepository.save(user);
    }
  
    async login(user: any): Promise<{ access_token: string }> {
      console.log("user: ",user)
      const payload = { username: user.username, sub: user.id,password:user.password };

      const token = jwt.sign(payload, 'secret_key_aspire');
  
      return { access_token: token };
    }
  }