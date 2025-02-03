import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthorizationService } from "./AuthorizationService";
import { IContact } from "../Interfaces/IContact";
import { EmployeeCount } from "../Enums/EmployeeCount";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient,
    private authorizationService: AuthorizationService) {
  }

  sendContact(contact: IContact) {
    console.log(contact)
    //contact.EmployeeCount = Object.keys(EmployeeCount).indexOf(`${contact.EmployeeCount}`);
    this.authorizationService.sendRequestWithData<IContact, IContact>('/api/contact', contact).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
