import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller({ version: "1", path: "users" })
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @Post('/add')
  create(
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'List of all users retrieved successfully.' })
  @Get("/all")
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, description: 'The user has been updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Patch('/update/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'The user has been deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Delete('/remove/:id')
  remove(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.userService.remove(id);
  }
}
