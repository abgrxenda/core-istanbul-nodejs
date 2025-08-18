// DTO can be used with mysql postgre mongo

export class CreateUserDto{
    name: string;
    email: string;
    role: 'MANAGER' | 'DEVELOPER' | 'TESTER';
}