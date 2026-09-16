import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ContactDeleteComponent } from './contact-delete.component';

describe('ContactDeleteComponent', () => {
  let component: ContactDeleteComponent;
  let fixture: ComponentFixture<ContactDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactDeleteComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => undefined } },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            contact: {
              firstName: '',
              lastName: '',
              company: '',
              employeeCount: 0,
              companyInformation: '',
              email: '',
              phone: '',
              message: '',
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
