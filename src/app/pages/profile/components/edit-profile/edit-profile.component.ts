import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from '../../../../shared/models/profile';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EditProfileService } from '../../service/edit-profile/edit-profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  @Input() public profile: Profile;
  @Input() public fileToUpload: File;
  @Output() public getValidateForm = new EventEmitter<boolean>();

  constructor(
    private msg: NzMessageService,
    private profileService: EditProfileService,
    private message: NzMessageService
  ) {}

  ngOnInit() {}

  public onChange() {
    if (
      this.isStringvalidate(this.profile.firstName) ||
      this.isStringvalidate(this.profile.lastName) ||
      this.isStringvalidate(this.profile.address) ||
      !this.profile.startingDay ||
      !this.profile.birthday ||
      !this.profile.sex ||
      !this.profile.age
    ) {
      this.getValidateForm.emit(false);
      // this.message.error('Please enter full information!!!');
    } else if (!this.isFileImage(this.fileToUpload)) {
      this.getValidateForm.emit(false);
    } else {
      this.getValidateForm.emit(true);
      this.profileService
        .uploadImage(this.fileToUpload, this.profile.id)
        .subscribe();
    }
  }

  public isStringvalidate(data: string): boolean {
    if (data == null || data === '') {
      return true;
    }
    return false;
  }

  public handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    if (!this.isFileImage(this.fileToUpload)) {
      this.message.error(
        'Please upload to photo Image file formats TIF, JPG, PNG, GIF!!!'
      );
    }
    this.onChange();
  }

  public isFileImage(file) {
    const acceptedImageTypes = [
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/jpg'
    ];
    return file && acceptedImageTypes.includes(file['type']);
  }
}
