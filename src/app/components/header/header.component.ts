import { Component, OnChanges, OnInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isAuth!: Boolean
  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(status => {
      this.isAuth = status
      this.cdr.detectChanges()
    })
  }
}
