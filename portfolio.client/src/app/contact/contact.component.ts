import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IContact } from '../../Interfaces/IContact';
import { EmployeeCount } from '../../Enums/EmployeeCount';
import { ContactService } from '../../Services/ContactService';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from '../../Services/ToastService';

@Component({
  selector: 'app-contact',  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contact: IContact = {
    firstName: '',
    lastName: '',
    company: '',
    employeeCount: EmployeeCount.OneToTen,
    companyInformation: '',
    email: '',
    phone: '',
    message: ''
  };

  employeeCounts = Object.keys(EmployeeCount).filter(key => isNaN(Number(key))).map((key, index) => ({
    index: index - 1,
    label: EmployeeCount[key as keyof typeof EmployeeCount],
  }));

  @ViewChild('contactForm') contactForm!: NgForm;
  constructor(private contactService: ContactService,
    private toastService: ToastService) { }

  onSubmit() {
    if (this.contactForm.valid) {
      if (typeof this.contact.employeeCount === 'string') {
        this.contact.employeeCount = parseInt(this.contact.employeeCount);
      }
      this.contactService.sendContact(this.contact).subscribe({
        complete: () => {
          this.toastService.showSuccess('Gelukt, uw bericht is successvol ontvangen!', 'Success');
          this.contactForm.onReset();
        },
        error: (error) => {
          this.toastService.showError('Oeps! hier ging iets niet helemaal goed. Probeer het opnieuw!', 'Error');
        }
      });
    }
  }
}
