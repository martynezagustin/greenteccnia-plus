import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(private toastr: ToastrService) { }
  info(message: string, title?: string){
    this.toastr.info(message, title, {
      timeOut: 6000,
      positionClass: 'toast-top-right',
      tapToDismiss: true,
      enableHtml: true,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
      toastClass: 'ngx-toastr'
    })
  }
  success(message: string, title?: string){
    this.toastr.success(message, title,{
      timeOut: 3000,
      positionClass: 'toast-top-right',
      tapToDismiss: true,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      toastClass: 'ngx-toastr'
    })
  }
}
