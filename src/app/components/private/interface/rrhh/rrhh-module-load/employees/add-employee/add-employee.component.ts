import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeesService } from '../../../../../../../services/private/rrhh/employees/employees.service';
import { EnterpriseService } from '../../../../../../../services/private/enterprise/enterprise.service';
import { SyndicatesService } from '../../../../../../../services/private/rrhh/syndicates/syndicates.service';
import { CctService } from '../../../../../../../services/private/rrhh/cct/cct.service';
import { AddCctComponent } from './add-cct/add-cct.component';
import { CCT } from '../../../../../../../../interfaces/enterprise/rrhh/ccts/cct.interface';
import { AddSyndicateComponent } from './add-syndicate/add-syndicate.component';
import { AddArtComponent } from './add-art/add-art.component';
import { ART } from '../../../../../../../../interfaces/enterprise/rrhh/arts/art.interface';
import { ArtService } from '../../../../../../../services/private/rrhh/art/art.service';
import { BankService } from '../../../../../../../services/private/rrhh/bank/bank.service';
import { Bank } from '../../../../../../../../interfaces/enterprise/rrhh/banks/bank.interface';
import { AddBankComponent } from './add-bank/add-bank.component';
import { Employee } from '../../../../../../../../interfaces/enterprise/rrhh/employees/employee.interface';

@Component({
  selector: 'app-add-employee',
  imports: [CommonModule, ReactiveFormsModule, AddCctComponent, AddSyndicateComponent, AddArtComponent, AddBankComponent],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {
  formAddEmployee!: FormGroup
  enterpriseId!: any
  title!: String
  //sindicatos para indexar
  syndicates: any[] = []
  ccts: CCT[] = []
  arts: ART[] = []
  banks: Bank[] = []
  //mensajes de form
  messageError: String = ''
  successfullyMessage: String = ''
  loading: boolean = false
  //los usos del formulario
  isUpdate!: boolean
  employeeToUpdate: Employee | null = null
  constructor(private fb: FormBuilder, private employeeService: EmployeesService, private enterpriseService: EnterpriseService, private syndicateService: SyndicatesService, private cctService: CctService, private artService: ArtService, private bankService: BankService) {
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
        leavingDate: new FormControl(null),
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
        cbu: new FormControl(null, [Validators.required, Validators.pattern(/^\d{22}$/)])
      }),
      verifiedData: new FormControl(false, Validators.requiredTrue),
      privacityData: new FormControl(false, Validators.requiredTrue)
    })
  }
  ngOnInit(): void {
    this.getEnterpriseId()
    if (this.enterpriseId) {
      this.getAllSyndicates()
      this.getAllCCTs()
      this.getAllARTs()
      this.getAllBanks()
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
      //arts
      this.artService.ARTs$.subscribe(
        response => {
          this.arts = response ?? []
        },
        error => {
          console.error(error);
        }
      )
      //banks
      this.bankService.banks$.subscribe(
        response => {
          this.banks = response ?? []
        },
        error => {
          console.error(error);
        }
      )
    }
    this.employeeService.employeeToEdit$.subscribe(
      response => {
        this.employeeToUpdate = response;
        this.isUpdate = this.employeeToUpdate != null
        this.title = !this.isUpdate ? 'Agregar empleado' : 'Editar empleado';
        this.loadingItemToUpdate()
      }
    )
  }
  handleSubmit(e: Event) {
    this.loading = true
    this.successfullyMessage = ''
    this.messageError = ''
    e.preventDefault()
    console.log(this.formAddEmployee.value)
    if (this.enterpriseId)
      this.isUpdate ? this.updateEmployee() : this.addEmployee()

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
  getAllARTs() {
    this.artService.getAllARTs(this.enterpriseId).subscribe(
      response => {
        this.arts = response
      },
      error => {
        console.error(error);
      }
    )
  }
  getAllBanks() {
    this.bankService.getAllBanks(this.enterpriseId).subscribe(
      response => {
        this.banks = response ?? []
      },
      err => {
        console.error(err);
      }
    )
  }
  addEmployee() {
    this.employeeService.addEmployee(this.enterpriseId, this.formAddEmployee.value).subscribe(
      () => {
        this.successfullyMessage = 'Empleado creado con éxito.'
        this.loading = false
        this.formAddEmployee.reset()
        setTimeout(() => {
          this.successfullyMessage = ''
        }, 3000);
      },
      err => {
        this.messageError = err.error.message
        this.loading = false
      }
    )
  }
  updateEmployee() {
    const id = this.employeeToUpdate?._id;
    if (typeof id === 'string') {
      this.employeeService.updateEmployee(this.enterpriseId, id, this.formAddEmployee.value).subscribe(
        () => {
          this.successfullyMessage = 'Empleado actualizado con éxito.'
          this.loading = false
          this.formAddEmployee.reset()
          setTimeout(() => {
            this.successfullyMessage = ''
          }, 3000);
        },
        err => {
          this.messageError = err.error.message
          this.loading = false
        }
      );
    } else {
      this.messageError = 'ID de empleado no válido para la actualización.';
      this.loading = false;
    }
  }
  loadingItemToUpdate() {
    if (this.employeeToUpdate != null) {
      this.formAddEmployee.patchValue(this.employeeToUpdate)
    }
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
