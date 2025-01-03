import { Component } from '@angular/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.css'
})
export class IntroductionComponent {
  email: string = "St3fbuurman@gmail.com";
  private birthDate: Date = new Date("2003-04-23");
  private startOfStudy = new Date("2023-08-25");

  get age(): number {
    const today = new Date();
    let age = today.getFullYear() - this.birthDate.getFullYear();

    const monthDifference = today.getMonth() - this.birthDate.getMonth();
    const dayDifference = today.getDate() - this.birthDate.getDate();
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age;
  }

  get yearsOfStudy(): string {
    const today = new Date();
    const yearDifference = today.getFullYear() - this.startOfStudy.getFullYear();

    const monthDifference = today.getMonth() - this.startOfStudy.getMonth();
    const dayDifference = today.getDate() - this.startOfStudy.getDate();

    const shouldRoundUp = monthDifference > 0 || (monthDifference === 0 && dayDifference > 0);

    return this.getDutchOrdinal(shouldRoundUp ? yearDifference + 1 : yearDifference);
  }

  private getDutchOrdinal(year: number): string {
    switch (year) {
      case 1: return "eerste";
      case 2: return "tweede";
      case 3: return "derde";
      case 4: return "vierde";
      default: return `${year}de`;
    }
  }
}
