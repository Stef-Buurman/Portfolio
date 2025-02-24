import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../Services/ToastService';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { ContactService } from '../../Services/ContactService';
import { IContact } from '../../Interfaces/IContact';

@Component({
  selector: 'app-contact-delete',
  standalone: false,

  templateUrl: './contact-delete.component.html',
  styleUrl: './contact-delete.component.css'
})
export class ContactDeleteComponent implements OnInit {
  public contact!: IContact;
  public apiKey: string = '';
  constructor(
    private contactService: ContactService,
    private dialogRef: MatDialogRef<ContactListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contact: IContact },
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.contact = this.data.contact;
  }

  onClose(deleted: boolean = false): void {
    this.dialogRef.close(deleted);
  }

  deleteContact() {
    if (this.contact.id) {
      this.contactService.deleteContact(this.contact.id, this.apiKey).subscribe({
        next: () => {
          this.toastService.showSuccess('Het contact is succesvol verwijderd!');
          this.onClose(true);
        },
        error: () => {
          this.toastService.showError('Er is iets misgegaan!');
          this.onClose();
        }
      });
    }

  }
}
