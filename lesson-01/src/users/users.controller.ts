import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';

interface User {
  id: number;
  name: string;
  dep: string;
}

@Controller('users')
export class UsersController {
    // @GET
    // @POST
    // @PUT @PATCH
    // @DELETE
    private readonly users: User[] = [
        { "id": 1, "name": "amro", "dep": "manager" },
        { "id": 2, "name": "omer", "dep": "ops" }
    ]

    @Get()
    findAll(@Query('dep') dep?: string) {
        if (dep) {
            return this.users.filter(user=> user.dep === dep)
        }
        return this.users
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.users.filter(user=> user.id.toString() === id)
    }

    @Post()
    create(@Body() user: {}) {
        return user
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdate:{}) {
        return {id, ...userUpdate}
    }

    @Delete(':id')
    delete(@Param('id') id: string, @Body() userDelete:{}) {
        return {id, ...userDelete}
    }



}
