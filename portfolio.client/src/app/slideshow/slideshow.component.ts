import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit, OnDestroy {
  slides = [
    'Assets/Images/Mijzelf/Foto5.jpg',
    'Assets/Images/Mijzelf/Foto1.jpg',
    'Assets/Images/Mijzelf/Foto2.jpg',
    'Assets/Images/Mijzelf/Foto3.jpg',
    'Assets/Images/Mijzelf/Foto4.jpg',
  ];

  currentIndex = 0;
  intervalId!: number;

  ngOnInit() {
    this.intervalId = window.setInterval(() => {
      this.nextSlide();
    }, 10000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }
}
