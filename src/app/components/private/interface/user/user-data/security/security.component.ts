import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-security',
  imports: [CommonModule, RouterOutlet],
  standalone: true,
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css', "../utils.css"]
})
export class SecurityComponent{
}
