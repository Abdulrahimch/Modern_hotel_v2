import { formatDate } from '@angular/common';
export class User {
  email: string;
  password: string;
  constructor(user) {
    {
      this.email = user.email || '';
      this.password = user.mobile || '';
    }
  }
}
