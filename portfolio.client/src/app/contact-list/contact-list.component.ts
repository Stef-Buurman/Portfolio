import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ContactService } from '../../Services/ContactService';
import { ToastService } from '../../Services/ToastService';
import { ContactDeleteComponent } from '../contact-delete/contact-delete.component';
import { EmployeeEnumPipe } from '../../Pipes/employee-enum.pipe';
import { Contact } from '../../api/generated/data-contracts';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, EmployeeEnumPipe],
  providers: [ContactService, ToastService],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent {
  public contacts: Contact[] = [];
  public sendRequest: boolean = false;
  public apiKey: string = '';
  constructor(
    private contactService: ContactService,
    private dialogRef: MatDialogRef<ContactListComponent>,
    private toastService: ToastService,
    private dialog: MatDialog,
  ) {}

  getContacts() {
    if (!this.apiKey || this.apiKey.trim().length === 0) {
      this.toastService.showWarning('Je hebt geen api-key ingevuld');
      return;
    }
    this.contactService.getContacts(this.apiKey).subscribe({
      next: (response: Contact[]) => {
        this.contacts = response;
        console.log(response);
        this.sendRequest = true;
        this.toastService.showSuccess('De contacten zijn succesvol opgehaald!');
      },
      error: (error) => {
        if (error.status === 401) {
          this.toastService.showError('Er is een verkeerde api-key ingevuld!');
        } else {
          this.toastService.showError('Er is iets misgegaan!');
        }
      },
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  deleteContact(id?: number) {
    console.log(id);
    if (id) {
      const deleteContactDialog = this.dialog.open(ContactDeleteComponent, {
        panelClass: 'contact-list',
        data: { contact: this.contacts.find((cont) => cont.id == id) },
      });
      deleteContactDialog.afterClosed().subscribe({
        next: (isDeleted: boolean) => {
          if (isDeleted) {
            this.contacts = this.contacts.filter((c) => c.id !== id);
            this.toastService.showSuccess(
              'Het contact is succesvol verwijderd!',
            );
          } else {
            this.toastService.showInfo('Het contact is niet verwijderd.');
          }
        },
        error: () => {
          this.toastService.showError('Er is iets misgegaan!');
        },
      });
    }
  }
}
