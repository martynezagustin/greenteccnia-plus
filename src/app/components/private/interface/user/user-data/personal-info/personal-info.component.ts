import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../../../interfaces/user/user.interface';
import { UserService } from '../../../../../../services/private/user/user.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  imports: [ReactiveFormsModule],
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css', "../utils.css"]
})
export class PersonalInfoComponent implements OnInit {
  updateForm: FormGroup
  user!: User
  userId: any = ''
  isEditable!: Boolean
  isLoading: Boolean = true
  //
  isSuccessMessage: String = ''
  isErrorMessage: String = ''
  isWarned: Boolean = false
  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.userId = this.userService.getUserId()
    this.updateForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      identityCard: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required)
    })
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.getUserInfo()
    }, 2000);
  }
  getUserInfo() {
    this.userService.getUserInfo(this.userId).subscribe(
      response => {
        this.user = response
        this.isLoading = false
      },
      err => {
        console.error(err);
      }
    )
  }
  toggleEdit() {
    this.isEditable = !this.isEditable
    if (this.isEditable) {
      this.loadUserDataToForm()
    }
  }
  loadUserDataToForm() {
    this.updateForm.patchValue(this.user)
  }
  handleSubmit() {
    const updatedUser = this.updateForm.value
    this.userService.updateUser(this.userId, updatedUser).subscribe(
      response => {
        this.isSuccessMessage = response.message
        this.isErrorMessage = ''
        this.getUserInfo()
      },
      err => {
        this.isErrorMessage = err.error.message
        this.isSuccessMessage = ''
        this.getUserInfo()
      }
    )
  }
}
