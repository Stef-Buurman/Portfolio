import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../Services/ContactService';
import { IContact } from '../../Interfaces/IContact';
import { ToastService } from '../../Services/ToastService';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent{
  public contacts: IContact[] = [];
  public sendRequest: boolean = false;
  public apiKey: string = '';
  constructor(
    private contactService: ContactService,
    private dialogRef: MatDialogRef<ContactListComponent>,
    private toastService: ToastService
  ) { }

  getContacts() {
    this.contactService.getContacts(this.apiKey).subscribe({
      next: (response: IContact[]) => {
        this.contacts = response;
        this.sendRequest = true;
        this.toastService.showSuccess('De contacten zijn succesvol opgehaald!', 'Success');
      },
      error: (error) => {
        if (error.status === 401) {
          this.toastService.showError('Er is een verkeerde api-key ingevuld!', 'Error');
        } else {
          this.toastService.showError('Er is iets misgegaan!', 'Error');
        }
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
