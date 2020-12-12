import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Staff } from './staff.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class StaffService {
  private readonly API_URL = 'http://localhost:5000/staff';
  dataChange: BehaviorSubject<Staff[]> = new BehaviorSubject<Staff[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) { }
  get data(): Staff[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllStaffs(): void {
    this.httpClient.get<Staff[]>(this.API_URL).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  // DEMO ONLY, you can find working methods below
  addStaff(staff: Staff): void {
    this.dialogData = staff;
    this.dialogData.name = this.dialogData.first + ' ' + this.dialogData.last;
    this.dialogData.joiningDate = this.dialogData.dob
    this.dialogData.account = 'staff';
    console.log('Running from staff.service')
    console.log(this.dialogData)
    //console.log('sending request....')
    //console.log(this.dialogData.email)
    this.httpClient.post<{msg: string}>("http://localhost:5000/staff/", this.dialogData).subscribe((res) => {
            console.log(res.msg);
        });
  }
  updateStaff(staff: Staff): void {
    this.dialogData = staff;

    this.httpClient.patch("http://localhost:5000/staff", this.dialogData)
    .subscribe((res) => {
      console.log(res)
    })
}
  deleteStaff(email: string): void {
    this.httpClient.delete("http://localhost:5000/staff/" + email)
      .subscribe((res) => {
          console.log(res)
      })
  }
}
