import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AuthorizationService } from '../Services/AuthorizationService';
import { MatDialog } from '@angular/material/dialog';
import { ContactListComponent } from './contact-list/contact-list.component';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isNavOpen: boolean = false;
  constructor(
    private authorizationService: AuthorizationService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.authorizationService.getApiKey();
  }

  scrollToSection(location:string): void {
    const element = document.getElementById(location);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  openNav():void {
    this.isNavOpen = !this.isNavOpen;
  }

  ngOnDestroy() {
    this.authorizationService.removeApiKey();
  }

  openContactList() {
    const dialogRef = this.dialog.open(ContactListComponent,{
      panelClass: 'contact-list'
    });
  }
}
