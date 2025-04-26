import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddActiveComponent } from "./add-active/add-active.component";
import { AddPassiveComponent } from "./add-passive/add-passive.component";

@Component({
  selector: 'app-menu-net-worth',
  imports: [CommonModule, FormsModule, AddActiveComponent, AddPassiveComponent],
  templateUrl: './menu-net-worth.component.html',
  styleUrl: './menu-net-worth.component.css'
})
export class MenuComponent implements OnChanges{
  @Input() selectedFormInput!: String
  selectedForm: String = 'active'
  showForm(type: "active" | "passive") {
    this.selectedForm = type
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedFormInput']) {
      console.log("Valor seleccionado", changes['selectedFormInput'].currentValue);
      this.selectedForm = changes['selectedFormInput'].currentValue
    }
  }
}
