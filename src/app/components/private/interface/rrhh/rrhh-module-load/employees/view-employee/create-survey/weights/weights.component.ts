import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WeightService } from '../../../../../../../../../services/private/rrhh/survey/weight/weight.service';

@Component({
  selector: 'app-weights',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './weights.component.html',
  styleUrl: './weights.component.css',
})
export class WeightsComponent implements OnInit {
  enterpriseId: any = localStorage.getItem('enterpriseId')
  formUpdateWeight!: FormGroup
  loading!: Boolean
  weights: any = []
  successMessage!: String
  errorMessage!: String
  constructor(private fb: FormBuilder, private weightService: WeightService) {
    this.formUpdateWeight = this.fb.group({
      satisfaction: new FormControl(0.5, [Validators.required, Validators.max(1), Validators.min(0.1), Validators.pattern(/^(0\.[1-9]\d*|1(\.0+)?)$/)]),
      relationshipWithTeam: new FormControl(0.3, [Validators.required, Validators.max(1), Validators.min(0.1), Validators.pattern(/^(0\.[1-9]\d*|1(\.0+)?)$/)]),
      workEnvironment: new FormControl(0.2, [Validators.required, Validators.max(1), Validators.min(0.1), Validators.pattern(/^(0\.[1-9]\d*|1(\.0+)?)$/)])
    })
  }
  ngOnInit(): void {
    this.weightService.getWeights(this.enterpriseId).subscribe(
      response => {
        this.weights = response
        this.formUpdateWeight.patchValue({
          satisfaction: this.weights.satisfaction,
          relationshipWithTeam: this.weights.relationshipWithTeam,
          workEnvironment: this.weights.workEnvironment
        })
      },
      err => {
        console.error(err);
      }
    )
  }
  handleSubmit() {
    this.errorMessage = ''
    this.successMessage = ''
    this.loading = true
    this.weightService.saveWeight(this.enterpriseId, this.formUpdateWeight.value).subscribe(
      (response: any) => {
        this.loading = false
        this.successMessage = response.message
        setTimeout(() => {
          this.successMessage = ''
        }, 2000);
      },
      err => {
        this.loading = false
        this.errorMessage = err.error.message || 'Ha ocurrido un error'
        setTimeout(() => {
          this.errorMessage = ''
        }, 2000);
      }
    )
  }
}
