import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class BookingService {
  constructor(private httpClient: HttpClient) { }

  addBooking(name: string, email: String, arriveDate: Date, departDate: Date, roomNumber: Number, account: String){
    const postBooking = {name, email, arriveDate, departDate, roomNumber, account }
    console.log(postBooking);
    this.httpClient.post<any>("http://127.0.0.1:5000/booking/", postBooking).subscribe((res) => {
      console.log(res);

    })
  }
  // editBooking(){
  //   const updatedBooking = []
  //   this.httpClient.patch<any>("http://127.0.0.1:5000/booking/", updatedBooking).subscribe((res) => {
  //     console.log(res)

  //   })
  }


