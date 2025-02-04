import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthorizationService } from "./AuthorizationService";
import { IContact } from "../Interfaces/IContact";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private authorizationService: AuthorizationService) {
  }

  sendContact(contact: IContact):Observable<any> {
    return this.authorizationService.postRequestWithData<IContact, IContact>('/api/contact', contact);
  }

  getContacts(apiKey:string):Observable<IContact[]> {
    return this.authorizationService.getRequest<IContact[]>('/api/contacts', apiKey);
  }
}
