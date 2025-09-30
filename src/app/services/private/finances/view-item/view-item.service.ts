import { Injectable } from '@angular/core';
type ViewerItemType = 'active' | 'passive' | 'income' | 'expense'
@Injectable({
  providedIn: 'root'
})
export class ViewItemService {
  private keyLocalStorage: string = 'itemView'
  private itemType: ViewerItemType | null = null
  constructor() { }
  setItemViewer(item: any, itemType: ViewerItemType) {
    this.itemType = itemType
    localStorage.setItem(this.keyLocalStorage, JSON.stringify(item))
  }
  getItemViewer(): ViewerItemType | null {
    return this.itemType
  }
  getItem(): any {
    const itemView = localStorage.getItem(this.keyLocalStorage)
    return itemView ? JSON.parse(itemView) : null
  }
  clear() {
    localStorage.removeItem(this.keyLocalStorage)
  }
}
