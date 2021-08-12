import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>,) { }

  async create(createUserDto: CreateUserDto): Promise<User | undefined> {
    const salt = await bcrypt.genSalt(8);
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hashPassword
    const createdUser = await this.usersRepository.create(createUserDto)
    return createdUser
  }

  async findAll() {
    const users = await this.usersRepository.findOne()
    return users
  }

  findOneById(id: number) {
    return `This action returns a #${id} user`;
  }
  async findOneByUsername(username: string): Promise<User> {
    const foundUser = await this.usersRepository.findOne({
      where: { username }
    })
    if (!foundUser) {

    }
    return
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
