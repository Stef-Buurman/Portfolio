import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { HeaderComponent } from './header/header.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { MotorcycleComponent } from './Backgrounds/motorcycle/motorcycle.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { WorkExperienceComponent } from './work-experience/work-experience.component';
import { HobbiesComponent } from './hobbies/hobbies.component';
import { Formula1Component } from './Backgrounds/formula1/formula1.component';
import { ProgrammingComponent } from './Backgrounds/programming/programming.component';
import { ContactComponent } from './contact/contact.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeEnumPipe } from '../Pipes/employee-enum.pipe';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    SlideshowComponent,
    HeaderComponent,
    IntroductionComponent,
    MotorcycleComponent,
    SkillsComponent,
    ProjectsComponent,
    WorkExperienceComponent,
    HobbiesComponent,
    Formula1Component,
    ProgrammingComponent,
    ContactComponent,
    ContactListComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    EmployeeEnumPipe,
    FormsModule
  ],
  exports: [
    EmployeeEnumPipe
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
