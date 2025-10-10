import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmployeesService } from '../../../../../../../services/private/rrhh/employees/employees.service';
import { Employee } from '../../../../../../../../interfaces/enterprise/rrhh/employees/employee.interface';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-view-employee',
  imports: [],
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.css'
})
export class ViewEmployeeComponent implements OnInit {
  @ViewChild('employeeContent', { static: false }) employeeContent!: ElementRef
  enterpriseId: any = localStorage.getItem('enterpriseId')
  employee: Employee | null = null;
  constructor(private employeeService: EmployeesService) { }
  ngOnInit(): void {
    this.employeeService.employeeToView$.subscribe(
      response => {
        if (response) {
          this.employee = response ?? null
          console.log("El empleado que deberíamos ver es", this.employee);
        }
      }
    )
  }
  downloadPDF() {
    const element = this.employeeContent.nativeElement

    html2canvas(element, { scale: 2, useCORS: true }).then(canvas => {
      const imageData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgProps = pdf.getImageProperties(imageData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

      pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`${this.employee?.personalInfo.name}_${this.employee?.personalInfo.lastname}_report.pdf`)
    })
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
}
