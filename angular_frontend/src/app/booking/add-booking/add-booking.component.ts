import { Component } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { BookingService } from './booking.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { min } from 'rxjs/operators';
import { startOfDay } from '@fullcalendar/core';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.sass']
})
export class AddBookingComponent {
  bookingForm: FormGroup;
  startDate = new Date(1999, 12, 12);

//   constructor() {
//     this.minDate = new Date(this.bookingForm.value.arriveDate);
//   }
// }

  constructor(private fb: FormBuilder,
              public bookingservice :BookingService,
              private snackBar: MatSnackBar) {
    this.bookingForm = this.fb.group({
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      //last: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      //gender: ['', [Validators.required]],
      //mobile: ['', [Validators.required]],
      //city: [''],
      arriveDate: ['', [Validators.required]],
      departDate: ['',  [Validators.required]],
      totalPerson: ['', [Validators.required]],
      roomNumber: ['', [Validators.required]],
      //password: ['', [Validators.required]],
      //roomType: ['', [Validators.required]],
      //address: [''],
      //uploadImg: [''],
      //note: ['']
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
    console.log('Form Value', this.bookingForm.value.email);
    this.bookingservice.addBooking(this.bookingForm.value.first,this.bookingForm.value.email, this.bookingForm.value.arriveDate, this.bookingForm.value.departDate, this.bookingForm.value.roomNumber, 'guest')
    this.showNotification(
      'snackbar-success',
      'Add Record Successfully...!!!',
      'bottom',
      'center'
    );
  }
}
