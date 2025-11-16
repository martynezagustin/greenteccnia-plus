import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmployeesService } from '../../../../../../../services/private/rrhh/employees/employees.service';
import { Employee } from '../../../../../../../../interfaces/enterprise/rrhh/employees/employee.interface';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import { Assist } from '../../../../../../../../interfaces/enterprise/rrhh/assists/assist.interface';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { SurveyService } from '../../../../../../../services/private/rrhh/survey/survey.service';
import { SurveyGreen } from '../../../../../../../../interfaces/enterprise/rrhh/surveyGreen/surveyGreen.interface';

@Component({
  selector: 'app-view-employee',
  imports: [CommonModule, CreateSurveyComponent],
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.css'
})
export class ViewEmployeeComponent implements OnInit {
  @ViewChild('employeeContent', { static: false }) employeeContent!: ElementRef
  enterpriseId: any = localStorage.getItem('enterpriseId')
  employee: Employee | null = null;
  surveyGreen: SurveyGreen | null = null
  alert: Boolean | null = null
  assists: Assist[] = []
  commonMoods: {_id: string, count: number}[] = []
  loading: boolean = false
  constructor(private employeeService: EmployeesService, private surveyService: SurveyService) { }
  ngOnInit(): void {
    this.loading = true
    this.employeeService.employeeToView$.subscribe(
      response => {
        if (response) {
          this.employeeService.getEmployee(this.enterpriseId, response).subscribe(
            response => {
              this.employee = response.employee ?? null
              this.surveyGreen = response.surveyGreen ?? null
              this.commonMoods = this.surveyGreen?.commonMoods ?? []
              this.alert = this.surveyGreen ? response.alert : null
              console.log(this.commonMoods);
              this.assists = response.employee.assists.slice(0, 3) ?? []
              console.log("El empleado que deberíamos ver es", this.employee);
              this.loading = false
            },
            err => {
              console.error(err);
              
            }
          )
        }
      }
    )
  }
  downloadPDF() {
    const element = this.employeeContent?.nativeElement;

    if (!element) return;

    // Clonar el elemento para evitar problemas de scroll y estilos
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.position = 'absolute';
    clone.style.top = '0';
    clone.style.left = '0';
    clone.style.width = '800px';
    clone.style.zIndex = '-1';
    clone.style.background = '#0a1f1f';
    clone.style.overflow = 'visible'; // Asegura que todo el contenido se muestre
    document.body.appendChild(clone);

    // Usar el clon para capturar todo el contenido, incluso el que se scrollea
    html2canvas(clone, { scale: 2, useCORS: true, scrollY: -window.scrollY }).then(canvas => {
      const imageData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Calcular el tamaño de la imagen en mm
      const imgProps = pdf.getImageProperties(imageData);
      const imgWidth = pageWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Agregar la imagen en varias páginas si es necesario
      pdf.addImage(imageData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imageData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${this.employee?.personalInfo.name}_${this.employee?.personalInfo.lastname}_report.pdf`);
      document.body.removeChild(clone);
    }).catch(err => {
      document.body.removeChild(clone);
      console.error(err);
    });
  }
  formatDate(date: Date | undefined) {
    if (!date) return '----'
    const dateOfBirthday = new Date(date);
    dateOfBirthday.setHours(dateOfBirthday.getHours() + 3)
    return dateOfBirthday.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }
  setIdOffEmployee(id: string | undefined){
    this.surveyService.setIdOffEmployeeForSurvey(id ?? '')
  }
}
