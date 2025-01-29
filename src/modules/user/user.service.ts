import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async create(create: CreateUserDto) {

    const conflictUser = await this.userRepository.findOneBy({
      username: create.username
    });
    if (conflictUser) {
      throw new ConflictException('Username already exists❗');
    }

    const newUser = this.userRepository.create({
      firstName: create.firstName,
      lastName: create.lastName,
      username: create.username,
      role: create.role
    });

    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find();

  }

  async findOne(id: number) {
    const findUser = await this.userRepository.findOne({ where: { id } });
    if (!findUser) {
      throw new NotFoundException('User not found❗');
    }
    return findUser
  }

  async update(id: number, update: UpdateUserDto) {
    const [findUser, conflictUser] = await Promise.all([
      this.userRepository.findOne({ where: { id } }),
      this.userRepository.findOneBy({ username: update.username }),
    ]);

    if (!findUser) {
      throw new NotFoundException('User not found❗');
    }
    if (conflictUser) {
      throw new ConflictException('Username already exists❗');
    }

    return await this.userRepository.update({ id }, {
      firstName: update.firstName,
      lastName: update.lastName,
      username: update.username,
      role: update.role
    });
  }

  async remove(id: number) {
    const findUser = await this.userRepository.findOne({ where: { id } });
    if (!findUser) {
      throw new NotFoundException('User not found❗');
    }
    return await this.userRepository.delete({ id });
  }
}
