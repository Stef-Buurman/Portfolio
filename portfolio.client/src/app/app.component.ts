import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthorizationService } from '../Services/AuthorizationService';
import { ContactComponent } from './contact/contact.component';
import { Formula1Component } from './Backgrounds/formula1/formula1.component';
import { HobbiesComponent } from './hobbies/hobbies.component';
import { HuskyComponent } from './Backgrounds/husky/husky.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { MotorcycleComponent } from './Backgrounds/motorcycle/motorcycle.component';
import { ProgrammingComponent } from './Backgrounds/programming/programming.component';
import { ProjectsComponent } from './projects/projects.component';
import { SkillsComponent } from './skills/skills.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { WorkExperienceComponent } from './work-experience/work-experience.component';
import { ToastContainerComponent } from './toast-container/toast-container.component';

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
    ToastContainerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  isNavOpen = false;

  constructor(private readonly authorizationService: AuthorizationService) {}

  ngOnInit(): void {
    this.authorizationService.getApiKey().subscribe({
      error: (error: unknown) =>
        console.error('API key ophalen mislukt', error),
    });
  }

  ngOnDestroy(): void {
    this.authorizationService.removeApiKey();
  }

  scrollToSection(id: string): void {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.isNavOpen = false;
  }

  toggleNav(): void {
    this.isNavOpen = !this.isNavOpen;
  }
}
