import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';

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

  constructor() { }

  title = 'portfolio.client';
}
