import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { DbService } from 'src/db/db.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
   @Inject(DbService)
   private dbService: DbService;

   async register(registerUserDto: RegisterUserDto){
      const users: User[] = await this.dbService.read();
      const foundUser = users.find(user => user.username === registerUserDto.username);

      if(foundUser) {
        throw new BadRequestException("用户已注册")
      }
      const user = new User();
      user.username = registerUserDto.username;
      user.password = registerUserDto.password;

      users.push(user);
      await this.dbService.write(users);
      return user;
    }

    async login(loginUserDto: RegisterUserDto){
      const users: User[] = await this.dbService.read();
      const foundUser = users.find(user => user.username === loginUserDto.username);

      if(!foundUser) {
        throw new BadRequestException("用户未注册")
      }
      if (foundUser.password !== loginUserDto.password) {
        throw new BadRequestException("密码不正确")
      }

      return foundUser;
    }

}
