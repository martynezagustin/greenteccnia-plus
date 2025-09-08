import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeesService } from '../../../../../../../services/private/rrhh/employees/employees.service';
import { EnterpriseService } from '../../../../../../../services/private/enterprise/enterprise.service';
import { SyndicatesService } from '../../../../../../../services/private/rrhh/syndicates/syndicates.service';
import { CctService } from '../../../../../../../services/private/rrhh/cct/cct.service';

@Component({
  selector: 'app-add-employee',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {
  formAddEmployee!: FormGroup
  enterpriseId!: any
  //sindicatos para indexar
  syndicates: any[] = []
  ccts: any[] = []
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
    }
  }
  handleSubmit() {
    if (this.enterpriseId)
      this.employeeService.addEmployee(this.enterpriseId, this.formAddEmployee.value).subscribe(
        response => {
          console.log(response)
        },
        err => {
          console.error(err);
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
  getAllCCTs(){
    this.cctService.getAllCCTs(this.enterpriseId).subscribe(
      response => {
        this.ccts = response
      },
      err => {
        console.error(err);
      }
    )
  }
}
