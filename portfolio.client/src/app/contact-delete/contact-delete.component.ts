import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'; // if you use <button mat-button>
import { ToastService } from '../../Services/ToastService';
import { ContactService } from '../../Services/ContactService';
import { IContact } from '../../Interfaces/IContact';
import { EmployeeEnumPipe } from '../../Pipes/employee-enum.pipe';

@Component({
  selector: 'app-contact-delete',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeEnumPipe,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [ContactService, ToastService],
  templateUrl: './contact-delete.component.html',
  styleUrls: ['./contact-delete.component.css'],
})
export class ContactDeleteComponent implements OnInit {
  public contact!: IContact;
  public apiKey: string = '';

  constructor(
    private contactService: ContactService,
    private dialogRef: MatDialogRef<ContactDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contact: IContact },
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.contact = this.data.contact;
  }

  onClose(deleted: boolean = false): void {
    this.dialogRef.close(deleted);
  }

  deleteContact() {
    if (!this.apiKey.trim()) {
      this.toastService.showWarning('Je hebt geen api-key ingevuld');
      return;
    }

    if (this.contact.id) {
      this.contactService
        .deleteContact(this.contact.id, this.apiKey)
        .subscribe({
          next: () => {
            this.toastService.showSuccess(
              'Het contact is succesvol verwijderd!',
            );
            this.onClose(true);
          },
          error: () => {
            this.toastService.showError('Er is iets misgegaan!');
            this.onClose();
          },
        });
    }
  }
}
