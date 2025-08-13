import { Controller, Get, Post, Patch, Delete, Param, Body, Query, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    findAll(@Query('dep') dep?: string, @Query('email') email?: string) {
        return this.userService.findAll(dep, email)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id)
    }

    @Post()
    create(@Body() user: CreateUserDto) {
        return this.userService.create(user)
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdate:UpdateUserDto) {
        return this.userService.update(+id, userUpdate)
    }

    @Delete(':id')
    delete(@Param('id') id: string, @Body() userDelete:{}) {
        return this.userService.delete(+id)
    }



}
