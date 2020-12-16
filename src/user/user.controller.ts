import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { IUser, IUserLogin } from "./interface/user.interface";
import { CreateUserDto } from "./modal/user.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUser(): Observable<IUser[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  getOneUser(@Param('id') id): Observable<IUser> {
    return this.userService.findOne(id);
  }

  @Post('registration')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
    .then((data) => {
      data.password = undefined;
      return data;
    });
  }

  @Delete('delete/:id')
  deleteUser(@Param('id') id) {
    return this.userService.delete(id);
  }

  @Post('login')
  loginUser2(@Body() createUserDto: CreateUserDto) {
    return this.userService.login(createUserDto)
    .then(data => {
      return {access_token: data}
    })
    .catch(err => {
      return err;
    });
  }

}
