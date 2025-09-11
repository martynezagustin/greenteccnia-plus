import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeesService } from '../../../../../../../services/private/rrhh/employees/employees.service';
import { EnterpriseService } from '../../../../../../../services/private/enterprise/enterprise.service';
import { SyndicatesService } from '../../../../../../../services/private/rrhh/syndicates/syndicates.service';
import { CctService } from '../../../../../../../services/private/rrhh/cct/cct.service';
import { AddCctComponent } from './add-cct/add-cct.component';
import { CCT } from '../../../../../../../../interfaces/enterprise/rrhh/ccts/cct.interface';
import { error } from 'console';
import { AddSyndicateComponent } from './add-syndicate/add-syndicate.component';

@Component({
  selector: 'app-add-employee',
  imports: [CommonModule, ReactiveFormsModule, AddCctComponent, AddSyndicateComponent],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {
  formAddEmployee!: FormGroup
  enterpriseId!: any
  //sindicatos para indexar
  syndicates: any[] = []
  ccts: CCT[] = []
  //mensajes de form
  messageError: String = ''
  constructor(private fb: FormBuilder, private employeeService: EmployeesService, private enterpriseService: EnterpriseService, private syndicateService: SyndicatesService, private cctService: CctService) {
    this.formAddEmployee = this.fb.group({
      personalInfo: this.fb.group({
        name: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        gender: new FormControl(''),
        identityCard: this.fb.group({
          value: new FormControl(null, Validators.required),
          type: new FormControl('', Validators.required)
        }),
        address: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.email, Validators.required])
      }),
      jobInfo: this.fb.group({
        startDate: new FormControl(null, Validators.required),
        leavingDate: new FormControl(null, Validators.required),
        position: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required),
        CCT: this.fb.group({
          name: new FormControl('', Validators.required),
          cctNumber: new FormControl(null, Validators.required)
        }),
        syndicate: this.fb.group({
          name: new FormControl('', Validators.required)
        }),
        ART: this.fb.group({
          name: new FormControl('', Validators.required)
        }),
        department: new FormControl('', Validators.required),
        contractType: new FormControl('', Validators.required),
      }),
      financialInformation: this.fb.group({
        grossSalary: new FormControl(null, Validators.required),
        bank: new FormControl('', Validators.required),
        cbu: new FormControl('', Validators.required)
      })
    })
  }
  ngOnInit(): void {
    this.getEnterpriseId()
    if (this.enterpriseId) {
      this.getAllSyndicates()
      this.getAllCCTs()
      this.cctService.CCTs$.subscribe(
        response => {
          this.ccts = response ?? []
        },
        error => {
          console.error(error);
        }
      )
      //sindicatos
      this.syndicateService.syndicates$.subscribe(
        response => {
          this.syndicates = response ?? []
        },
        error => {
          console.error(error);
        }
      )
    }
  }
  handleSubmit(e: Event) {
    e.preventDefault()
    if (this.enterpriseId)
      this.employeeService.addEmployee(this.enterpriseId, this.formAddEmployee.value).subscribe(
        response => {
          console.log(response)
        },
        err => {
          this.messageError = err.error.message
        }
      )
  }
  getEnterpriseId() {
    this.enterpriseId = this.enterpriseService.getEnterpriseId()
  }
  getAllSyndicates() {
    this.syndicateService.getAllSyndicates(this.enterpriseId).subscribe(
      response => {
        this.syndicates = response
      },
      err => {
        console.error(err);
      }
    )
  }
  getAllCCTs() {
    this.cctService.getAllCCTs(this.enterpriseId).subscribe(
      response => {
        this.ccts = response
      },
      error => {
        console.error(error);
      }
    )
  }
  //validators
  get name() {
    return this.formAddEmployee.get('personalInfo.name') as FormControl
  }
  get lastname() {
    return this.formAddEmployee.get('personalInfo.lastname') as FormControl
  }
  get gender() {
    return this.formAddEmployee.get('personalInfo.gender') as FormControl
  }
  get identityCardValue() {
    return this.formAddEmployee.get('personalInfo.identityCard.value') as FormControl
  }
  get identityCardType() {
    return this.formAddEmployee.get('personalInfo.identityCard.type') as FormControl
  }
  get address() {
    return this.formAddEmployee.get('personalInfo.address') as FormControl
  }
  get phone() {
    return this.formAddEmployee.get('personalInfo.phone') as FormControl
  }
  get email() {
    return this.formAddEmployee.get('personalInfo.email') as FormControl
  }
  get startDate() {
    return this.formAddEmployee.get('jobInfo.startDate') as FormControl
  }
  get position() {
    return this.formAddEmployee.get('jobInfo.position') as FormControl
  }
  get grossSalary() {
    return this.formAddEmployee.get('financialInformation.grossSalary') as FormControl
  }
  get cbu() {
    return this.formAddEmployee.get('financialInformation.cbu') as FormControl
  }
}
