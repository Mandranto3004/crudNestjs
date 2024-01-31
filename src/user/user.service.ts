import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from  'bcrypt'

@Injectable()
export class UserService {

  saltOrRounds: number = 10;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>){
    }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    const hasPass = await bcrypt.hash(createUserDto.password, this.saltOrRounds);

    let data = {
      ...createUserDto,
      password: hasPass
    }
    return (await this.userRepository.save(data));
  }

  async findAll() {
    const users = await this.userRepository.find();
    return  users.map((user)=> user.toResponse())
  }

  async findOne(id: string) {
    const user =  (await this.userRepository.findOne({where: { id }}));
    if(user){
      return user.toResponse();
    }
      return  new NotFoundException(`User with id = ${id} was not found`);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updateUser = await this.userRepository.findOne({where: {id}});
    if(updateUserDto.email !== updateUser.email){
      return await this.isEmailExists(updateUser.email)
    }
    if(updateUser){
      Object.assign(updateUser, updateUserDto);
      const hasPassUpdate = await bcrypt.hash(updateUser.password, this.saltOrRounds);
      let dataUpdate = {
        ...updateUser,
        password: hasPassUpdate
      }
      return await this.userRepository.save(dataUpdate);
    }

      throw new NotFoundException(`User with id = ${id} was not found`)
  }

  async remove(id: string) {
    const result = await this.findOneById(id);
    if(!result){
      return new NotFoundException();
    } 
    return await this.userRepository.remove(result);
  }

  async findByEmail(email: string){
    const emailUser = await this.userRepository.findOne({where: { email }});
    if(emailUser){
      return emailUser;
    }
      return  new NotFoundException(`User with email = ${email} was not found`);
  }

  async isEmailExists(email: string){
    const emailUser = await this.findByEmail(email);
    if(emailUser)
    throw new BadRequestException( 
      `User with email = ${email} already exist`
    )
  }

  async findOneById(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }
}
