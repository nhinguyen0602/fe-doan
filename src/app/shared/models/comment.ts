import { User } from './user';
export class Comment{
    id:number
    name:string
    createAt:Date
    updateAt:Date
    userDTO:User
    edited:boolean=false;
}