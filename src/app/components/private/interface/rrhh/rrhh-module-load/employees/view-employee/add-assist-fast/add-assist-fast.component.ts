import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Employee } from '../../../../../../../../../interfaces/enterprise/rrhh/employees/employee.interface';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  hourCheckInEmployee!: string | undefined
  successMessage: string = ''
  errorMessage: string = ''
  loading: boolean = false
  dateNow: Date = new Date()
  status!: 'on-time' | 'absent' | 'license' | 'vacations' | 'late'
  fields = [
    'checkIn', 'checkOut', 'distanceKm', 'observations', 'transportationMode', 'fuelType'
  ]
  @Input() employee!: Employee | null

  optionsStatus = [
    { value: 'on-time', viewValue: 'Presente' },
    { value: 'absent', viewValue: 'Ausente' },
    { value: 'license', viewValue: 'Licencias' },
    { value: 'vacations', viewValue: 'Vacaciones' },
  ]

  transportationModes = [
    { value: 'car', viewValue: 'Automóvil' },
    { value: 'motorcycle', viewValue: 'Motocicleta' },
    { value: 'bicycle', viewValue: 'Bicicleta' },
    { value: 'public-transport', viewValue: 'Transporte público' },
    { value: 'on-foot', viewValue: 'Caminata' },
    { value: 'none', viewValue: 'No aplica' }
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
      checkIn: new FormControl('', Validators.pattern(/^([01]\d|2[0-3]):[0-5]\d$/)),
      checkOut: new FormControl('', Validators.pattern(/^([01]\d|2[0-3]):[0-5]\d$/)),
      status: new FormControl('', Validators.required),
      remote: new FormControl(''),
      transportationMode: new FormControl(''),
      fuelType: new FormControl(''),
      distanceKm: new FormControl(0, [Validators.min(0)]),
      observations: new FormControl('')
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
    //de alguna manera, suscribirnos al remote para que nos dé el output
    this.FormAddAssistFast.get('remote')?.valueChanges.subscribe(
      value => {
        if(value){
          console.log('El value de remote?', value)
          console.log(this.FormAddAssistFast)
          this.changeRequiredFieldsForRemote()
        } else {
          this.changeRequiredFields()
        }
      }
    )
  }

  getHourCheckInEmployee() {
    console.log('Obteniendo hora de check-in esperada del empleado:', this.employee?.jobInfo.expectedCheckInTime);
    const checkInTimeExpected = this.employee?.jobInfo.expectedCheckInTime
    this.FormAddAssistFast.patchValue({ checkIn: checkInTimeExpected })
  }
  onChangeStatusSelection() {
    this.status = this.FormAddAssistFast.get('status')?.value
    if (this.status !== 'on-time') {
      this.changeRequiredFields()
      this.FormAddAssistFast.get('checkIn')?.disable()
      this.FormAddAssistFast.get('checkOut')?.disable()
    } else {
      this.FormAddAssistFast.get('checkIn')?.enable()
      this.FormAddAssistFast.get('checkOut')?.enable()
    }
  }
  onChangeVehicleSelection() {
    const selectedVehicle = this.FormAddAssistFast.get('transportationMode')?.value
    if (selectedVehicle === 'on-foot' || selectedVehicle === 'public-transport' || selectedVehicle === 'none') {
      this.FormAddAssistFast.get('fuelType')?.disable()
      this.FormAddAssistFast.patchValue({ fuelType: 'none' })
    } else {
      this.FormAddAssistFast.get('fuelType')?.enable()
    }
  }
  handleSubmit() {
    this.loading = true
    this.successMessage = ''
    this.errorMessage = ''
    if (!this.employee) {
      this.errorMessage = 'Empleado no disponible.'
      this.loading = false
      return
    }
    this.assistService.addAssist(this.enterpriseId, this.employee._id, this.FormAddAssistFast.value).subscribe(
      () => {
        this.successMessage = 'Asistencia creada con éxito.'
        this.FormAddAssistFast.reset()
        this.loading = false
                setTimeout(() => {
          this.successMessage = ''
          this.errorMessage = ''
        }, 3000);
      },
      err => {
        this.errorMessage = err.error.message || 'Error al crear la asistencia. Por favor, intenta nuevamente.'
        this.loading = false
        setTimeout(() => {
          this.successMessage = ''
          this.errorMessage = ''
        }, 3000);
      }
    )
  }
  changeRequiredFields() {
    for (const field of this.fields) {
      this.FormAddAssistFast.get(field)?.setValidators([
        (control: AbstractControl) => {
          const status = this.FormAddAssistFast.get('status')?.value
          if (status === 'on-time' && !control.value) {
            return { required: true }
          }
          return null
        }
      ])
    }
  }
  changeRequiredFieldsForRemote() {
    for (const field of this.fields) {
      this.FormAddAssistFast.get(field)?.setValidators([
        (control: AbstractControl) => {
          const status = this.FormAddAssistFast.get('status')?.value
          if (status === 'on-time' && !control.value) {
            return { required: false }
          }
          return null
        }
      ])
    }
  }
  changeEventRemote() {
    const currentValue = this.FormAddAssistFast.get('remote')?.value
    this.FormAddAssistFast.patchValue({remote: !currentValue})
  }

}
