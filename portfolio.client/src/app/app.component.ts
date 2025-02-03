import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AuthorizationService } from '../Services/AuthorizationService';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isNavOpen: boolean = false;
  constructor(private authorizationService: AuthorizationService) { }
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
}
