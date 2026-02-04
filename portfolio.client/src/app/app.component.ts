import { Component } from '@angular/core';
import { AuthorizationService } from '../Services/AuthorizationService';
import { MatDialog } from '@angular/material/dialog';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { WorkExperienceComponent } from './work-experience/work-experience.component';
import { HobbiesComponent } from './hobbies/hobbies.component';
import { ContactComponent } from './contact/contact.component';
import { Formula1Component } from './Backgrounds/formula1/formula1.component';
import { ProgrammingComponent } from './Backgrounds/programming/programming.component';
import { HuskyComponent } from './Backgrounds/husky/husky.component';
import { MotorcycleComponent } from './Backgrounds/motorcycle/motorcycle.component';

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [
    SlideshowComponent,
    IntroductionComponent,
    MotorcycleComponent,
    SkillsComponent,
    HuskyComponent,
    ProjectsComponent,
    ProgrammingComponent,
    WorkExperienceComponent,
    Formula1Component,
    HobbiesComponent,
    ContactComponent,
  ],
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
