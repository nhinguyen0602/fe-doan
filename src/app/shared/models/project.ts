import {Status} from "./status";
export class Project {
    id: number;
    name: string;
    description: string;
    createAt: Date;
    updateAt: Date;
    status:Status;
  
    // constructor(obj?: any) {
    //   Object.assign(this, obj);
    // }
  }
  