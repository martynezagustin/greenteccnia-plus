import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Employee } from '../../../../../../../../../interfaces/enterprise/rrhh/employees/employee.interface';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AssistsService } from '../../../../../../../../services/private/rrhh/assists/assists.service';
@Component({
  selector: 'app-add-assist-fast',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-assist-fast.component.html',
  styleUrl: './add-assist-fast.component.css'
})
export class AddAssistFastComponent implements OnInit {
  FormAddAssistFast!: FormGroup
  enterpriseId: any = localStorage.getItem('enterpriseId')
  employeeId: any = localStorage.getItem('employeeId')
  hourCheckInEmployee!: string | undefined
  successMessage: string = ''
  errorMessage: string = ''
  loading: boolean = false
  dateNow: Date = new Date()
  @Input() employee!: Employee | null

  optionsStatus = [
    { value: 'on-time', viewValue: 'Presente' },
    { value: 'absent', viewValue: 'Ausente' },
    { value: 'license', viewValue: 'Licencias' },
    { value: 'vacations', viewValue: 'Vacaciones' },
    { value: 'late', viewValue: 'Tarde' }
  ]

  transportationModes = [
    { value: 'car', viewValue: 'Automóvil' },
    { value: 'motorcycle', viewValue: 'Motocicleta' },
    { value: 'bicycle', viewValue: 'Bicicleta' },
    { value: 'public-transport', viewValue: 'Transporte público' },
    { value: 'on-foot', viewValue: 'Caminata' },
    {value: 'none', viewValue: 'No aplica'}
  ]
  typeFuels = [
    { value: 'diesel', viewValue: 'Diésel' },
    { value: 'electric', viewValue: 'Eléctrico' },
    { value: 'GNC', viewValue: 'Gas Natural Comprimido' },
    { value: 'none', viewValue: 'No aplica' }
  ]

  constructor(private assistService: AssistsService, private fb: FormBuilder) {
    this.FormAddAssistFast = this.fb.group({
      dateAssist: new FormControl('', Validators.required),
      checkIn: new FormControl('', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):[0-5]\d$/)]),
      checkOut: new FormControl('', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):[0-5]\d$/)]),
      status: new FormControl('', Validators.required),
      transportationMode: new FormControl('', Validators.required),
      fuelType: new FormControl('', Validators.required),
      distanceKm: new FormControl(0, [Validators.required, Validators.min(0)]),
      observations: new FormControl('', Validators.required)
    })
  }
  ngOnInit(): void {
    console.log(this.employee)
    if (!this.employee) {
      console.warn('Aún no existe this employee, aviso');
    }
    this.FormAddAssistFast.patchValue({
      dateAssist: this.dateNow.toISOString().split('T')[0]
    })
  }

  getHourCheckInEmployee() {
    console.log('Obteniendo hora de check-in esperada del empleado:', this.employee?.jobInfo.expectedCheckInTime);
    const checkInTimeExpected = this.employee?.jobInfo.expectedCheckInTime
    this.FormAddAssistFast.patchValue({ checkIn: checkInTimeExpected })
  }
  onChangeStatusSelection(){
    const selectedStatus = this.FormAddAssistFast.get('status')?.value
    if(selectedStatus !== 'on-time'){
      this.FormAddAssistFast.get('checkIn')?.disable()
      this.FormAddAssistFast.get('checkOut')?.disable()
    }
  }
  onChangeVehicleSelection(){
    const selectedVehicle = this.FormAddAssistFast.get('transportationMode')?.value
    if(selectedVehicle === 'on-foot' || selectedVehicle === 'public-transport' || selectedVehicle === 'none'){
      this.FormAddAssistFast.get('fuelType')?.disable()
      this.FormAddAssistFast.patchValue({ fuelType: 'none' })
    } else {
      this.FormAddAssistFast.get('fuelType')?.enable()
    }
  }
  handleSubmit(){
    console.log(this.employeeId)
    this.loading = true
    this.successMessage = ''
    this.errorMessage = ''
    this.assistService.addAssist(this.enterpriseId, this.employeeId, this.FormAddAssistFast.value).subscribe(
      () => {
        this.successMessage = 'Asistencia creada con éxito.'
        this.loading = false
      },
      err => {
        this.errorMessage = err.error.message || 'Error al crear la asistencia. Por favor, intenta nuevamente.'
        this.loading = false
      }
    )
  }
}
