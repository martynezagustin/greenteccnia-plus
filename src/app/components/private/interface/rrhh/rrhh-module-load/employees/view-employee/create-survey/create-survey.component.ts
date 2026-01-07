import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SurveyService } from '../../../../../../../../services/private/rrhh/survey/survey.service';


@Component({
  selector: 'app-create-survey',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-survey.component.html',
  styleUrl: './create-survey.component.css'
})
export class CreateSurveyComponent implements OnInit {
  CreateSurvey!: FormGroup
  enterpriseId: string = localStorage.getItem('enterpriseId') || ''
  employeeId!: string
  surveyModal!: any
  isModalVisible = false
  loading: boolean = false
  dateNow: Date = new Date()
  satisfactionOptions = [
    { icon: '😡', value: 1, label: 'Muy insatisfecho', color: 'btn-outline-dark' },
    { icon: '😔', value: 2, label: 'Insatisfecho', color: 'btn-outline-danger' },
    { icon: '😐', value: 3, label: 'Neutral', color: 'btn-outline-warning' },
    { icon: '🙂', value: 4, label: 'Satisfecho', color: 'btn-outline-primary' },
    { icon: '😁', value: 5, label: 'Muy satisfecho', color: 'btn-outline-success' }
  ]
  ngOnInit(): void {
    this.dateNow.setHours(0,0,0,0)
    this.CreateSurvey.patchValue({
      dateSurvey: this.dateNow.toISOString().split('T')[0]
    })
  }
  selectedSatisfaction: number | null = null
  step = 1;
  width = '33%';
  categories: { id: string; name: string }[] = []
  workEnvironment: { id: string, name: string }[] = []
  moodOptions: { icon: string, label: string }[] = []
  successMessage: string | null = null
  errorMessage: string | null = null
  constructor(private fb: FormBuilder, private surveyService: SurveyService) {
    this.categories = [
      { id: "conditions", name: "Condiciones de trabajo" },
      { id: "leadership", name: "Liderazgo" },
      { id: "recognition", name: "Reconocimiento" },
      { id: "balance", name: "Balance" },
      { id: "motivation", name: "Motivación" }
    ]

    this.workEnvironment = [
      { id: 'remote', name: 'Remoto' },
      { id: 'workLoadLevel', name: '📈 Carga laboral' },
      { id: 'noiseLevel', name: '🔈 Nivel de ruido' },
      { id: 'ergonomics', name: '💺 Ergonomía' },
      { id: 'temperature', name: '🌡️ Confort térmico' },
    ]

    this.moodOptions = [
      { icon: '😌', label: 'Aliviado' },
      { icon: '😰', label: 'Ansioso' },
      { icon: '😴', label: 'Cansado' },
      { icon: '😀', label: 'Contento' },
      { icon: '😔', label: 'Deprimido' },
      { icon: '⚡', label: 'Energizado' },
      { icon: '😫', label: 'Estresado' },
      { icon: '😡', label: 'Frustrado' },
      { icon: '😐', label: 'Indiferente' },
      { icon: '😤', label: 'Motivado' },
      { icon: '😟', label: 'Preocupado' },
      { icon: '🥹', label: 'Orgulloso' },
    ]

    const categoryControls = this.categories.reduce((acc, category) => {
      acc[category.id] = [2, Validators.required];
      return acc;
    }, {} as { [key: string]: any });

    const workEnvironmentControls = this.workEnvironment.reduce((acc, environment) => {
      if (environment.id !== 'remote') {
        acc[environment.id] = [2, Validators.required];
      } else {
        acc[environment.id] = [false, Validators.required]
      }
      return acc;
    }, {} as { [key: string]: any });

    this.CreateSurvey = this.fb.group({
      satisfaction: [null, Validators.required],
      relationshipWithTeam: [null, Validators.required],
      dateSurvey: [null, Validators.required],
      categories: this.fb.group(categoryControls),
      workEnvironment: this.fb.group(workEnvironmentControls),
      mood: this.fb.array([])
    })

  }
  handleSubmit() {
    //cargandooo
    this.loading = true
    //primero a lo primero, limpiemos los fields
    this.successMessage = null
    this.errorMessage = null
    this.employeeId = localStorage.getItem('employeeId') || ''
    console.log("Moods limpios", this.CreateSurvey.value)
    console.log("Qué employeeId llega?", this.employeeId);
    this.surveyService.createSurvey(this.enterpriseId, this.employeeId, this.CreateSurvey.value).subscribe({
      next: () => {
        this.CreateSurvey.reset()
        this.step = 1
        this.successMessage = 'Encuesta creada con éxito.'
        this.loading = false
        setTimeout(() => {
          this.successMessage = null
        }, 3000);
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Error al crear la encuesta.'
        this.loading = false
      }
    })
  }
  nextStep() {
    if (this.step < 4) this.step++
  }
  previousStep() {
    if (this.step > 1) this.step--
  }
  onMoodChange(event: any, mood: any) {
    const moodArray = this.CreateSurvey.get('mood') as FormArray

    console.log(moodArray);
    console.log("Evento:", event);
    if (event.target.checked) {
      moodArray.push(this.fb.control(mood.label))
    } else {
      const index = moodArray.controls.findIndex(x => x.value === mood.label);
      moodArray.removeAt(index);
    }
  }
}
