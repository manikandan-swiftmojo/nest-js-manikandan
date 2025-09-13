import { Body, Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { creteUserDto, updateUserDto } from './create-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    @Post('/singup')
    async create(
        @Body()
        CreateUserDto: creteUserDto,
    ) {
        return await this.usersService.signup(CreateUserDto);
    }

    // READ ALL (GET)
    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    // READ ONE by ID (GET)
    @Get('/:id')
    async findOne(@Param('id') id: string) {
        return await this.usersService.findOne(Number(id));
    }

  // UPDATE (PATCH)
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: updateUserDto,
  ) {
    const numericId = Number(id);
    return await this.usersService.update(numericId, updateUserDto);
  }

  // DELETE
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const numericId = Number(id);
    return await this.usersService.remove(numericId);
  }
}
