import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaffService } from '../all-staff/staff.service'
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.sass']
})
export class AddStaffComponent {
  staffForm: FormGroup;
  constructor(private fb: FormBuilder,
              public staffService : StaffService,
              private snackBar: MatSnackBar) {
    this.staffForm = this.fb.group({
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last: [''],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]],
      conformPassword: ['', [Validators.required]],
      designation: [''],
      department: [''],
      address: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      dob: ['', [Validators.required]],
      education: [''],
      uploadImg: ['']
    });
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }

  onSubmit() {
    //console.log('Form Value', this.staffForm.value);
    this.staffService.addStaff(this.staffForm.value);
    this.showNotification(
      'snackbar-success',
      'Add Record Successfully...!!!',
      'bottom',
      'center'
    );

  }
}
