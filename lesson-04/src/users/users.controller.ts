import { Controller, Get, Post, Patch, Delete, Param, Body, Query, Inject, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as usersEntity from './users.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(private userService: UsersService) { }

    @Get()
    // @UseGuards(AuthGuard('jwt'))
    findAll(@Query('dep') dep?: usersEntity.UserRole, @Query('email') email?: string) {
        return this.userService.findAll(dep, email)
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
    // @UseGuards(AuthGuard('jwt'))
    update(@Param('id') id: string, @Body() userUpdate: usersEntity.Users) {
        return this.userService.update(+id, userUpdate)
    }

    @Delete()
    // @UseGuards(AuthGuard('jwtdelete'))
    deletedomain(@Query('domain') domain: string) {
        return this.userService.deletedomain(domain)
    }

    @Delete(':id')
    // @UseGuards(AuthGuard('jwtdelete'))
    delete(@Param('id') id: string) {
        return this.userService.delete(+id)
    }



}
