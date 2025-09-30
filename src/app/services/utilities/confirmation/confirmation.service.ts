import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor() { }
  confirm(message: string) {
    return new Promise<boolean>((resolve, rejected) => {
      resolve(window.confirm(message || "¿Estás seguro?"))
    })
  }
}
