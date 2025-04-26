import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-password-and-recovery',
  imports: [RouterLink],
  templateUrl: './password-and-recovery.component.html',
  styleUrl: '../../security.component.css'
})
export class PasswordAndRecoveryComponent {
 @Input() loading!: Boolean
}
