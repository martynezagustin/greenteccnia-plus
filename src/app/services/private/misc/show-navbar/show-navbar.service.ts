import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowNavbarService {
  private show!: Boolean
  constructor() { }
  setShowNavbar() {
    this.show = !this.show
  }
  getShowNavbar() {
    return this.show
  }
}
