import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssistsService } from '../../../../../../services/private/rrhh/assists/assists.service';
import { Assist } from '../../../../../../../interfaces/enterprise/rrhh/assists/assist.interface';
import { Subject, takeUntil } from 'rxjs';
import { EnterpriseService } from '../../../../../../services/private/enterprise/enterprise.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assists',
  imports: [CommonModule],
  templateUrl: './assists.component.html',
  styleUrl: './assists.component.css'
})
export class AssistsComponent implements OnInit,OnDestroy{
  loading: Boolean = true
  private destroy$ = new Subject<void>
  enterpriseId: any = localStorage.getItem('enterpriseId')
  assists: Assist[] | null = []
  constructor(private assistsService: AssistsService, private enterpriseService: EnterpriseService){}
  ngOnInit(): void {
    if(!this.assists || this.assists.length === 0 || this.assists === null ){
      console.log('Ejecutando línea de código')
      this.loadAssists()
    }
    this.assistsService.assists$.pipe(takeUntil(this.destroy$)).subscribe(
      response => {
        this.assists = response
        this.loading = false
      },
      err => {
        console.error(err);
        this.loading = false
      }
    )
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
  loadAssists(){
    this.assistsService.getAllAssists(this.enterpriseId).subscribe(
      response => {
        this.assists = response
        console.log(response);
        this.loading = false
      },
      err => {
        console.error(err);
        this.loading = false
      }
    )
  }
  formatDate(date: Date){
    const dateObj = new Date(date)
    dateObj.setUTCHours(dateObj.getHours() + 3)
    return dateObj.toLocaleDateString('es-AR',{
      year: 'numeric',
      month: '2-digit',
      day:'2-digit'
    })
  }
  formatValuesOfStatus(status: string): String{
    const dictionary = {
      'on-time': '✅ Presente',
      'absent': '🔴 Ausente',
      'license': '📜 Licencia',
      'vacations': '🧳 Vacaciones',
      'late': '⌛ Tarde'
    }
    return dictionary[status as keyof typeof dictionary]
  }
}
