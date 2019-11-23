import { User } from './user';
import {Status} from "./status";
export class Project {
    id: number;
    name: string;
    description: string;
    createAt: Date;
    updateAt: Date;
    userCreate:User;
    status:string;
  
    // constructor(obj?: any) {
    //   Object.assign(this, obj);
    // }
  }
  