import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Booking } from './booking.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class BookingService {
  //private readonly API_URL = 'assets/data/booking.json';
  private readonly API_URL = 'http://localhost:5000/booking';
  dataChange: BehaviorSubject<Booking[]> = new BehaviorSubject<Booking[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) { }
  get data(): Booking[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllBookings(): void {
    this.httpClient.get<Booking[]>(this.API_URL).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  getAllCheckIns(): void{
    this.httpClient.get<Booking[]>("http://localhost:5000/todaysCheckIn").subscribe(
      data => {

        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  bookingStatistics() {
    this.httpClient.get<Booking[]>("http://localhost:5000/bookingStatistics").subscribe(
      data => {
        console.log('Data is ', data)
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
}

  lockStatus(email: String, lockStatus: String): void{
    let update = {email, lockStatus}

    this.httpClient.patch("http://localhost:5000/booking", update)
    .subscribe(
      data => {
        console.log(data);
    })
    }

  // DEMO ONLY, you can find working methods below
  addBooking(booking: Booking): void {
    this.dialogData = booking;
  }
  // updateBooking(booking: Booking): void {
  //   this.dialogData = booking;
  // }
  deleteBooking(id: number): void {
    console.log(id);
  }

  editBookingBackEnd(name: string, email: string,  arriveDate: Date, departDate: Date, roomNumber: number){
    let updatedBooking = {name, email,  arriveDate, departDate, roomNumber}
    this.httpClient.patch("http://localhost:5000/booking/", updatedBooking)
      .subscribe((res) => {console.log(res)})
  }

  deleteBookingBackEnd(email: string){
    let deleteBooking = email
    console.log('Sending delete request')
    console.log(deleteBooking)
    this.httpClient.delete("http://localhost:5000/booking/" + deleteBooking)
      .subscribe((res) => {console.log(res)})
  }
}
