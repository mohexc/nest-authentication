import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username)
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { password, username, ...rest } = user
      return rest
    }
    return null
  }

}
