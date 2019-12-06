import { Skill } from "./skill";
export class Profile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  birthday: Date;
  sex: boolean;
  address: string;
  startingDay: string;
  avatarBase64: string;
  fileUpload: File;
  skills: Skill[];
  enable: boolean;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
