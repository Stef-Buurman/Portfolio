import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactService } from '../../Services/ContactService';
import { ToastService } from '../../Services/ToastService';
import { EmployeeEnumPipe } from '../../Pipes/employee-enum.pipe';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { Contact, EmployeeCount } from '../../api/generated/data-contracts';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, EmployeeEnumPipe, MatDialogModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  contact: Contact = {
    id: 0,
    firstName: '',
    lastName: '',
    company: '',
    employeeCount: EmployeeCount.OneToTen,
    companyInformation: '',
    email: '',
    phone: null,
    message: '',
  };

  employeeCounts = Object.values(EmployeeCount)
    .map((value) => ({
      index: value,
      label: value,
    }));

  @ViewChild('contactForm') contactForm!: NgForm;
  constructor(
    private contactService: ContactService,
    private toastService: ToastService,
    private dialog: MatDialog,
  ) {}

  openContactList(): void {
    this.dialog.open(ContactListComponent, {
      panelClass: 'contact-list',
      width: 'min(1100px, 96vw)',
      maxWidth: '96vw',
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.contactService.sendContact(this.contact).subscribe({
        complete: () => {
          this.toastService.showSuccess(
            'Gelukt, uw bericht is successvol ontvangen!',
            'Success',
          );
          this.contactForm.onReset();
        },
        error: (error) => {
          this.toastService.showError(
            'Oeps! hier ging iets niet helemaal goed. Probeer het opnieuw!',
            'Error',
          );
        },
      });
    }
  }
}
