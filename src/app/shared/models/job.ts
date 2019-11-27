import { User } from 'src/app/shared/models/user';
export class Job{
    id:number;
    content:string; 
    createAt:Date;                  
    updateAt:Date;
    userCreate:User;
    
}