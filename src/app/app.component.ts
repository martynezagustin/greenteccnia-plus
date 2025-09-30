import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'greenteccnia-plus';
  isAuthenticated: boolean = false
  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(status => {
      this.isAuthenticated = status
    })
  }
}
