import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in-with-recovery-key',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './log-in-with-recovery-key.component.html',
  styleUrl: './log-in-with-recovery-key.component.css'
})
export class LogInWithRecoveryKeyComponent implements OnInit {
  logInForm: FormGroup
  loading!: Boolean
  errorMessage!: String
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.logInForm = this.fb.group({
      username: new FormControl('', Validators.required),
      recoveryKey: new FormControl('', Validators.required)
    })
  }
  ngOnInit(): void {
    this.loading = false
  }
  handleSubmit(): void {
    this.loading = true
    this.authService.logInWithRecoveryKey(this.logInForm.value.username, this.logInForm.value.recoveryKey).subscribe(
      (response) => {
        localStorage.setItem("userId", response.userId)
        this.router.navigate(["/verify-2fa"])
        this.loading = false
      },
      err => {
        this.errorMessage = err.error.message

        this.loading = false
      }
    )
  }
}
