import { Controller, Get, Post, Patch, Delete, Param, Body, Query, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as usersEntity from './users.entity';

@Controller('users')
export class UsersController {
    //======================
    constructor(private userService: UsersService) { }
    //=======================
    // @GET
    // @POST
    // @PUT @PATCH
    // @DELETE

    @Get()
    findAll(@Query('dep') dep?: usersEntity.UserRole) {
        return this.userService.findAll(dep)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id)
    }

    @Post()
    create(@Body() user: usersEntity.Users) {
        return this.userService.create(user)
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdate:usersEntity.Users) {
        return this.userService.update(+id, userUpdate)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.userService.delete(+id)
    }



}
