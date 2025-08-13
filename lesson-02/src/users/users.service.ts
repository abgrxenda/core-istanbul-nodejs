import { Injectable } from '@nestjs/common';
import { console } from 'inspector';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        
        {
            "id": 3,
            "name": "Clementine Bauch",
            "email": "Nathan@yesenia.net",
            "role": "DEVELOPER",
        },
        {
            "id": 1,
            "name": "Leanne Graham",
            "email": "Sincere@april.biz",
            "role": "TESTER",
        },
        {
            "id": 2,
            "name": "Ervin Howell",
            "email": "Shanna@melissa.tv",
            "role": "TESTER",
        },
        {
            "id": 4,
            "name": "Patricia Lebsack",
            "email": "Julianne.OConner@kory.org",
            "role": "DEVELOPER",
        },
        {
            "id": 6,
            "name": "Chelsey Dietrich",
            "email": "Lucio_Hettinger@annie.ca",
            "role": "MANAGER"
        }
    ]

    findAll(dep?: string, email?: string) {
        if (dep) {
            return this.users.filter(user=> user.role === dep)
        }
        if (email) {
            return this.users.filter(user=> user.email === email)
        }
        return this.users
    }

    findOne(id: number) {
        return this.users.find(user => user.id === id)
    }

    create(user: CreateUserDto) {
        const generateNewID = [...this.users].sort((a, b) => b.id - a.id) //DESC SORT
        const newUser = {
            id: generateNewID[0].id + 1,
            ...user,
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, userUpdate: UpdateUserDto) {
        this.users = this.users.map(x => {
            if (x.id === id) {
                return {...x, ...userUpdate}
            }
            return x
        })
        return this.findOne(id)
    }

    delete(id: number) {
        const removeUser = this.findOne(id)
        
        this.users = this.users.filter(user => user.id !== id)
        
        return removeUser
        
    }

}
