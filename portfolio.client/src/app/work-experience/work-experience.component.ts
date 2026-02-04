import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
export interface WorkExperience {
  logo: string;
  alt: string;
  jobTitle: string;
  company: string;
  date: string;
}
@Component({
  selector: 'app-work-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css'],
})
export class WorkExperienceComponent {
  public workExperiences: WorkExperience[] = [
    {
      logo: 'Assets/Images/WerkErvaring/LMS.png',
      alt: 'Last Mile Solutions',
      jobTitle: 'Part time medewerker',
      company: 'Last Mile Solutions',
      date: 'Augustus 2025 - Heden',
    },
    {
      logo: 'Assets/Images/WerkErvaring/Logo-Hoppinger.png',
      alt: 'Hoppinger',
      jobTitle: 'Stage',
      company: 'Hoppinger',
      date: 'September 2025 - Januari 2026',
    },
    {
      logo: 'Assets/Images/WerkErvaring/XD-Connects.png',
      alt: 'XD Connects',
      jobTitle: 'Software developer',
      company: 'XD Connects',
      date: 'Mei 2023 - Augustus 2023',
    },
    {
      logo: 'Assets/Images/WerkErvaring/XD-Connects.png',
      alt: 'XD Connects',
      jobTitle: 'Stage',
      company: 'XD Connects',
      date: 'Augustus 2022 - April 2023',
    },
  ];
}
