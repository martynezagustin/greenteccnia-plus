import { Component, OnInit } from '@angular/core';
import { AddItemComponent } from "../add-item/add-item.component";
import { CommonModule } from '@angular/common';
import { ItemService } from '../../../../../../services/private/finances/items/item/item.service';

@Component({
  selector: 'app-menu-off-canvas',
  imports: [AddItemComponent, CommonModule],
  templateUrl: './menu-off-canvas.component.html',
  styleUrl: './menu-off-canvas.component.css'
})
export class MenuOffCanvasComponent implements OnInit {
  showOption: Boolean = false
  showTitle: string = 'Registros rápidos'
  view!: 'active' | 'passive' | 'income' | 'expense'
  offCanvasInterface!: 'cashFlowInterface' | 'netWorthInterface'
  constructor(private itemService: ItemService) { }
  showOptions() {
    this.showOption = !this.showOption
  }
  ngOnInit(): void {
    this.getViewItem()
    console.log(this.view)
  }
  getViewItem() {
    this.itemService.viewTypeItemSubject$.subscribe(
      response => {
        this.view = response
      },
      err => {
        console.error(err);
      }
    )
  }
  
}
