import { Component, OnInit } from '@angular/core';
import { SustainabilityObjectiveService } from '../../../../../../../services/private/sustainability/sustainability-objective/sustainability-objective.service';
import { UserService } from '../../../../../../../services/private/user/user.service';
import { EnterpriseService } from '../../../../../../../services/private/enterprise/enterprise.service';
import { response } from 'express';
import { HandlersRoutesService } from '../../../../../../../services/private/dashboard/handlers/handlers-routes/handlers-routes.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../../../../../services/private/enterprise/misc/toast/toast.service';
import { SustainableObjective } from '../../../../../../../../interfaces/enterprise/sustainability/sustainable-objective.interface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-sustainable-objectives',
  imports: [],
  templateUrl: './add-sustainable-objectives.component.html',
  styleUrls: ['../add-sustainability-data.component.css', './add-sustainable-objectives.component.css']
})
export class AddSustainableObjectivesComponent implements OnInit {
  userId: any = ''
  enterpriseId: any = ''
  loading: Boolean = false
  successMessage: string = ''
  successPush: Boolean = false
  itemAdded: string = ''
  errorMessage: string = ''
  constructor( private userService: UserService, private enterpriseService: EnterpriseService, private handlersRoutes: HandlersRoutesService, private router: Router, private toastService: ToastService) {
    this.userId = this.userService.getUserId()
  }
  public avaiableObjectives = [
    { title: "Reducción del consumo energético en la empresa", date: new Date(), status: "Pendiente", impact: "Mediano", relationWithODS: "7 - Energía asequible y no contaminante", loading: false },
    { title: "Fomentar la equidad de género en la empresa", date: new Date(), status: "Pendiente", impact: "Alto", relationWithODS: "5 - Igualdad de género", loading: false },
    { title: "Implementación y uso de energías renovables", date: new Date(), status: "Pendiente", impact: "Alto", relationWithODS: "7 - Energía asequible y no contaminante", loading: false },
    { title: "Reducción de la huella de carbono", date: new Date(), status: "Pendiente", impact: "Alto", relationWithODS: "13 - Acción por el clima", loading: false },
    { title: "Fomentar la diversidad e inclusión en la empresa", date: new Date(), status: "Pendiente", impact: "Mediano", relationWithODS: "10 - Reducción de las desigualdades", loading: false },
    { title: "Alianzas con proveedores sustentables", date: new Date(), status: "Pendiente", impact: "Alto", relationWithODS: "12 - Producción y consumo responsables", loading: false },
    { title: "Trabajo remoto y reducción de desplazamientos", date: new Date(), status: "Pendiente", impact: "Alto", relationWithODS: "8 - Trabajo decente y crecimiento económico", loading: false },
  ]
  private maxDisplayed = 3
  public selectedObjectives: any = []
  public displayedObjectives = this.avaiableObjectives.slice(0, this.maxDisplayed)
  ngOnInit(): void {
    this.getEnterpriseId()
    this.getUserId()
  }
  getImpactColor(impact: string): string {
    switch (impact) {
      case "Alto":
        return "tomato"
      case "Mediano":
        return "orange"
      case "Bajo":
        return "green"
      default:
        return "gray"
    }
  }
  addObjective(objective: any) {
    // Verifica si el objetivo ya está seleccionado
    console.log(objective)
    objective.loading = true
    const index = this.displayedObjectives.indexOf(objective)
    this.selectedObjectives.push(objective)
    objective.loading = false
    this.toastService.success(`Objetivo: ${objective.title}, añadido con éxito.`, '¡Felicidades!')
    if (index > -1) {
      this.displayedObjectives.splice(index, 1)
      while (this.displayedObjectives.length < 3) {
        const next = this.avaiableObjectives.find(
          obj => !this.displayedObjectives.includes(obj) && !this.selectedObjectives.includes(obj)
        );
        if (!next) break; // No hay más objetivos disponibles
        this.displayedObjectives.push(next);
        this.successPush = true
        this.itemAdded = next.title
        setTimeout(() => {
          this.itemAdded = ''
          this.successPush = false
        }, 3000);
      }
    }

  }
  getEnterpriseId() {
    this.enterpriseId = this.enterpriseService.getEnterpriseId()
  }
  handleSubmitObjectives() {
    console.log(this.enterpriseId)
    this.loading = true
    const requests = this.selectedObjectives.map((objective: any) =>
      this.enterpriseService.addInitialsSustainableObjectives(this.userId, objective)
    )
    forkJoin(requests).subscribe(
      () => {
        this.successMessage = 'Todos los objetivos sustentables se han añadido con éxito.'
        this.loading = false
        this.router.navigate(['/dashboard'])
      },
      err => {
        console.error(err);
        this.loading = false
      }
    )
  }
  omit() {
    this.router.navigate(['/dashboard'])
    this.handlersRoutes.reload()
  }
  getUserId(){
    this.userId = this.userService.getUserId()
  }
}
