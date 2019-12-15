import { Role } from './role';
export class User {
    id: number;
    idUser: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    age: number;
    avatar: string;
    birthday: Date;
    sex: boolean;
    address: string;
    starting_day: Date;
    status: boolean;
    token: string;
    enable: boolean
    role:string
}