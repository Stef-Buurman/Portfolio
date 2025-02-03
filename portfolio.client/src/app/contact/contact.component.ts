import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IContact } from '../../Interfaces/IContact';
import { EmployeeCount, EmployeeCountNumeric } from '../../Enums/EmployeeCount';
import { ContactService } from '../../Services/ContactService';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contact: IContact = {
    FirstName: '',
    LastName: '',
    Company: '',
    EmployeeCount: -1,
    CompanyInformation: '',
    Email: '',
    Phone: '',
    Message: ''
  };

  employeeCounts = Object.keys(EmployeeCount).filter(key => isNaN(Number(key))).map((key, index) => ({
    index: index - 1,
    label: EmployeeCountNumeric[key as keyof typeof EmployeeCountNumeric],
  }));

  @ViewChild('contactForm') contactForm!: NgForm;
  constructor(private contactService: ContactService) { }

  onSubmit() {
    console.log(this.contactForm.value);
    if (this.contactForm.valid) {
      console.log('Form Submitted:', this.contact);
      if (typeof this.contact.EmployeeCount === 'string') {
        this.contact.EmployeeCount = parseInt(this.contact.EmployeeCount);
      }
      this.contactService.sendContact(this.contact);
      this.contactForm.resetForm();
      this.contact.EmployeeCount = -1;
    }
  }
}
