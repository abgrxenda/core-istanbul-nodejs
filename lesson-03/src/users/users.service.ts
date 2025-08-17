import { Injectable } from '@nestjs/common';
import { console } from 'inspector';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import * as usersEntity from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UsersService {

    constructor(@InjectRepository(usersEntity.Users) private userRepo: Repository<usersEntity.Users>) { }

    // findAll(dep?: string, email?: string) {
    //     if (dep) {
    //         return this.users.filter(user=> user.role === dep)
    //     }
    //     if (email) {
    //         return this.users.filter(user=> user.email === email)
    //     }
    //     return this.users
    // }

    async findAll(dep?: usersEntity.UserRole) {
        if (dep) {
            return this.userRepo.find({
                where: { role: dep },
            });
        }
        return this.userRepo.find();
    }

    // findOne(id: number) {
    //     return this.users.find(user => user.id === id)
    // }

    async findOne(id: number) {
        const existingUser = await this.userRepo.findOneBy({ id });
        if (!existingUser) {
            const findUser = { error: 'User Not Found' }
            return findUser
        }
        return this.userRepo.findOneBy({ id });
    }

    // create(user: CreateUserDto) {
    //     const generateNewID = [...this.users].sort((a, b) => b.id - a.id) //DESC SORT
    //     const newUser = {
    //         id: generateNewID[0].id + 1,
    //         ...user,
    //     }
    //     this.users.push(newUser)
    //     return newUser
    // }


    async create(user: usersEntity.Users) {

        const existingUser = await this.userRepo.findOneBy({ email: user.email });
        if (existingUser) {
            const userExist = {
                ...existingUser,
                error: 'User Already Exist',
            }
            return userExist;
        }


        const newUser = this.userRepo.create(user);
        return this.userRepo.save(newUser);
    }

    // update(id: number, userUpdate: UpdateUserDto) {
    //     this.users = this.users.map(x => {
    //         if (x.id === id) {
    //             return {...x, ...userUpdate}
    //         }
    //         return x
    //     })
    //     return this.findOne(id)
    // }

    async update(id: number, user: Partial<usersEntity.Users>) {
        const existUser = await this.userRepo.findOneBy({ id });
        if (!existUser) {
            const findUser = { error: 'User Not Found' }
            return findUser

        }
        await this.userRepo.update({ id }, user);
        const updatedUser = await this.userRepo.findOneBy({ id });
        return updatedUser!;
    }

    // delete(id: number) {
    //     const removeUser = this.findOne(id)

    //     this.users = this.users.filter(user => user.id !== id)

    //     return removeUser

    // }

    async delete(id: number) {
        const deleteUser = await this.userRepo.delete({ id });
        if (deleteUser.affected === 0) {
            throw new Error(`User id: '${id}' was not deleted `);
        }
    }

}
