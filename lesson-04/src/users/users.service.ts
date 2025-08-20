import { Injectable } from '@nestjs/common';
import { console } from 'inspector';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import * as usersEntity from './users.entity';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(usersEntity.Users) private userRepo: Repository<usersEntity.Users>) { }
    // constructor(@InjectRepository(usersEntity.Users) private userRepo: Repository<usersEntity.Users>) { }

    // findAll(dep?: string, email?: string) {
    //     if (dep) {
    //         return this.users.filter(user=> user.role === dep)
    //     }
    //     if (email) {
    //         return this.users.filter(user=> user.email === email)
    //     }
    //     return this.users
    // }

    async findAll(dep?: usersEntity.UserRole, email?: string) {

        if (dep && email) {
            const result = await this.userRepo.find({ where: { role: dep, email: email, } });
            const errorresult = { error: 'No user found' };
            return !result.length ? errorresult : result;
        }
        if (dep) {
            const result = await this.userRepo.find({ where: { role: dep } });
            const errorresult = { error: 'No user found' };
            return !result.length ? errorresult : result;
        }
        if (email) {
            const result = await this.userRepo.find({ where: { email: email } });
            const errorresult = { error: 'No user found' };

            return !result.length ? errorresult : result;
        }
        const result = await this.userRepo.find();
        const errorresult = { error: 'No user found' };

        return !result.length ? errorresult : result;
    }

    async findByEmail(email: string) {
        if (email) {
            const result = await this.userRepo.find({ where: { email: email } });
            const errorresult = { error: 'No user found' };

            return !result.length ? errorresult : result;
        }
        return { error: 'No user found' };
    }

    // findOne(id: number) {
    //     return this.users.find(user => user.id === id)
    // }

    async findOne(id: number) {
        const existingUser = await this.userRepo.findOneBy({ id });
        if (!existingUser) {
            const findUser = { id: id, error: 'User Not Found' }
            return findUser
            // throw new Error("User Not Found");
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

    // Not using DTO because we define the sqlite database in entity file
    async create(user: usersEntity.Users) {
// jwt
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
        // jwt
        const existUser = await this.userRepo.findOneBy({ id });
        // const existingDomain = await this.userRepo.find({ where: { email: Like(`%${domain}%`), } });
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

    async deletedomain(domain: string) {
        const existingDomain = await this.userRepo.find({ where: { email: Like(`%${domain}%`), } });
        if (!existingDomain.length) {
            const errorUser = { error: 'User Not Found' }
            return errorUser
        }
        // how to affect more than one record based on criteria
        const deletedDomain = await this.userRepo.delete(existingDomain.map(user=> user.id))
        return {...existingDomain, result: deletedDomain.affected };
    }

    async delete(id: number) {
        const existUser = await this.userRepo.findOneBy({ id });
        if (!existUser) {
            const errorUser = { error: 'User Not Found' }
            return errorUser

        }
        const deleteUser = await this.userRepo.delete({ id });
        return { result: deleteUser.affected };
        // if (deleteUser.affected === 0) {
        //     throw new Error(`User id: '${id}' was not deleted `);
        // }
    }

}
