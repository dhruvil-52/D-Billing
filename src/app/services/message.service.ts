import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(public toastr: ToastrService) { }

  showMessage(message, type) {
    if (type == "success") {
      this.toastr.success(message);
    }
    if (type == "error") {
      this.toastr.error(message);
    }
  }
}
