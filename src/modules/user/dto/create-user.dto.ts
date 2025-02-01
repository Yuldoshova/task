import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRoles } from '../../../utils/user-role.enum';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: 'John',
    description: 'First name of the user',
    required: false
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    type: String,
    example: 'Doe',
    description: 'Last name of the user',
    required: false
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    type: String,
    example: 'johndoe',
    description: 'Username of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    type: String,
    example: '123passwordUSER',
    description: 'Password of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  password: string;

  @ApiProperty({
    description: 'Role of the user',
    enum: UserRoles,
    default: UserRoles.USER,
    required: false
  })
  @IsOptional()
  @IsEnum(UserRoles)
  role?: UserRoles;
}
