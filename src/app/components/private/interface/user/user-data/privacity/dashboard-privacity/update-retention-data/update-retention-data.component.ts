import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InactivityPeriodService } from '../../../../../../../../services/private/user/security/inactivityPeriod/inactivity-period.service';
import { User } from '../../../../../../../../../interfaces/user/user.interface';

@Component({
  selector: 'update-retention-data',
  imports: [ReactiveFormsModule],
  templateUrl: './update-retention-data.component.html',
  styleUrl: './update-retention-data.component.css'
})
export class UpdateRetentionDataComponent {
  formUpdateRetentionData: FormGroup
  @Input() userId!: String 
  constructor(private fb: FormBuilder, private inactivityPeriodService: InactivityPeriodService) {
    this.formUpdateRetentionData = this.fb.group({
      inactivityPeriod: new FormControl(["1Y"])
    })
  }
  handleSubmit() {
    const date = new Date()
    let futureDate
    switch (this.formUpdateRetentionData.value.inactivityPeriod) {
      case "30D":
        futureDate = new Date(date.setMonth(date.getMonth() + 1))
        break;
      case "3M":
        futureDate = new Date(date.setMonth(date.getMonth() + 3))
        break;
      case " 6M":
        futureDate = new Date(date.setMonth(date.getMonth() + 6))
        break;
      case "9M":
        futureDate = new Date(date.setMonth(date.getMonth() + 9))
        break;
      default:
        break;
    }

    this.inactivityPeriodService.updateRetentionData(this.userId, this.formUpdateRetentionData.value.inactivityPeriod).subscribe(
      response => {
        console.log(response);  
      },err=> {
        console.error(err);
        
      }
    )
  }
}
