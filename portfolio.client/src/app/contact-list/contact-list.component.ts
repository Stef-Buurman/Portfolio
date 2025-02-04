import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../Services/ContactService';
import { IContact } from '../../Interfaces/IContact';
import { ToastService } from '../../Services/ToastService';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-list',  standalone: false,
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
    if (!this.apiKey || this.apiKey.trim().length === 0) {
      this.toastService.showWarning('Je hebt geen api-key ingevuld');
      return;
    }
    this.contactService.getContacts(this.apiKey).subscribe({
      next: (response: IContact[]) => {
        this.contacts = response;
        this.sendRequest = true;
        this.toastService.showSuccess('De contacten zijn succesvol opgehaald!');
      },
      error: (error) => {
        if (error.status === 401) {
          this.toastService.showError('Er is een verkeerde api-key ingevuld!');
        } else {
          this.toastService.showError('Er is iets misgegaan!');
        }
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
