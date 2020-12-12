import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './auth.model';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({providedIn: 'root'})
export class Auth {
  private readonly API_URL = 'http://127.0.0.1:5000/login/';
  private token: String;
  private isAuthenticated = false;

  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,
              private router: Router) { }
  get data(): User[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getToken(){
    return this.token;
  }

  getAuth(){
    return this.isAuthenticated;
  }

  // DEMO ONLY, you can find working methods beslow
  login(user: User): void {
    console.log(user);
    this.httpClient.post<{token: string}>(this.API_URL, user).subscribe((res) => {
      const token = res.token;
      this.token = token;
      if (this.token){
        this.isAuthenticated = true;
        //this.router.navigate(['/dashboard/main']);
        this.router.navigate(['/new-dashboard/main']);

      }

    })
    //this.httpClient.post<{msg: string}>("http://127.0.0.1:5000/staff/", this.dialogData).subscribe((res) => {
    //        console.log(res.msg);
    //    });
  }
//   updateStaff(staff: Staff): void {
//     this.dialogData = staff;

//     this.httpClient.patch("http://127.0.0.1:5000/staff", this.dialogData)
//     .subscribe((res) => {
//       console.log(res)
//     })
// }
//   deleteStaff(email: string): void {
//     this.httpClient.delete("http://127.0.0.1:5000/staff/" + email)
//       .subscribe((res) => {
//           console.log(res)
//       })
//   }
 }
