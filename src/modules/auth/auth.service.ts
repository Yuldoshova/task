import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as  bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ForgotPasswordDto, LoginDto, RefreshTokenDto, RegisterDto } from './dto';
import { User } from '../user';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private config: ConfigService
  ) { }

  async signUp(register: RegisterDto) {
    const conflictUser = await this.userRepository.findOneBy({
      username: register.username
    });
    if (conflictUser) {
      throw new ConflictException('Username already exists❗');
    }

    const hashPassword = await bcrypt.hash(register.password, 10)

    const newUser = this.userRepository.create({
      firstName: register.firstName,
      lastName: register.lastName,
      username: register.username,
      password: hashPassword
    })

    await this.userRepository.save(newUser)

    return {
      message: "Success✅",
      data: newUser
    }
  }

  async signIn(login: LoginDto) {
    const findUser = await this.userRepository.findOneBy({ username: login.username })
    if (!findUser) {
      throw new NotFoundException("User not found❗")
    }

    const isMatch = await bcrypt.compare(login.password, findUser.password)

    if (!isMatch) {
      throw new UnauthorizedException("Password incorrect❗")
    }

    const payload = { id: findUser.id, username: findUser.username }

    const access_token = this.jwtService.sign(payload, {
      secret: this.config.get<string>("jwtConfig.accessKey"),
      expiresIn: this.config.get<string>("jwtConfig.accessTime")
    })

    const refresh_token = this.jwtService.sign(payload, {
      secret: this.config.get<string>("jwtConfig.refreshKey"),
      expiresIn: this.config.get<string>("jwtConfig.refreshTime")
    })

    return {
      message: "Success✅",
      access_token,
      refresh_token,
      findUser
    }

  }

  async updatedPassword(payload: ForgotPasswordDto) {

  }

  async updatedToken(payload: RefreshTokenDto) {
    const userDecodedData = this.jwtService.decode(payload.refreshToken)
    const { id, username } = userDecodedData

    const access_token = await this.jwtService.signAsync({ id, username }, {
      secret: this.config.get<string>("jwtConfig.accessKey"),
      expiresIn: this.config.get<string>("jwtConfig.accessTime")
    })

    const refresh_token = this.jwtService.sign({ id, username }, {
      secret: this.config.get<string>("jwtConfig.refreshKey"),
      expiresIn: this.config.get<string>("jwtConfig.refreshTime")
    })

    return {
      message: "Success✅",
      access_token,
      refresh_token
    }
  }

}
