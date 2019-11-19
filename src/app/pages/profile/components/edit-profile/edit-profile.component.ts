// import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
// import { Profile } from "../../../../shared/models/profile";
// import { NzMessageService } from "ng-zorro-antd/message";
// import { EditProfileService } from "../../service/edit-profile/edit-profile.service";

// @Component({
//   selector: "app-edit-profile",
//   templateUrl: "./edit-profile.component.html",
//   styleUrls: ["./edit-profile.component.scss"]
// })
// export class EditProfileComponent implements OnInit {
//   @Input() private profile: Profile;
//   @Input() private fileToUpload: File;
//   @Output() private getValidateForm = new EventEmitter<boolean>();

//   constructor(
//     private msg: NzMessageService,
//     private profileService: EditProfileService,
//     private message: NzMessageService
//   ) {}

//   ngOnInit() {}

//   public onChange() {
//     if (
//       this.isStringvalidate(this.profile.firstName) ||
//       this.isStringvalidate(this.profile.lastName) ||
//       this.isStringvalidate(this.profile.address) ||
//       this.profile.startingDay == null ||
//       this.profile.birthday == null ||
//       this.profile.sex == null
//     ) {
//       this.getValidateForm.emit(false);
//       this.message.error("Please enter full information!!! Thank");
//     } else if (!this.isFileImage(this.fileToUpload)) {
//       this.getValidateForm.emit(false);
//     } else {
//       this.getValidateForm.emit(true);
//       this.profileService
//         .uploadImage(this.fileToUpload, this.profile.id)
//         .subscribe();
//     }
//   }

//   public isStringvalidate(data: string): boolean {
//     if (data == null || data === "") {
//       return true;
//     }
//     return false;
//   }

//   public handleFileInput(files: FileList) {
//     this.fileToUpload = files.item(0);
//     if (!this.isFileImage(this.fileToUpload)) {
//       this.message.error(
//         "Please upload to photo Image file formats TIF, JPG, PNG, GIF!!! Thank"
//       );
//     }
//     this.onChange();
//   }

//   public isFileImage(file) {
//     const acceptedImageTypes = [
//       "image/gif",
//       "image/jpeg",
//       "image/png",
//       "image/jpg"
//     ];
//     return file && acceptedImageTypes.includes(file["type"]);
//   }
// }
