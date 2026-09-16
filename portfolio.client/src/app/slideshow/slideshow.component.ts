import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

interface PortfolioSlide {
  src: string;
  position: string;
  label: string;
  note: string;
  size?: string;
}

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit, OnDestroy {
  readonly slides: PortfolioSlide[] = [
    {
      src: 'Assets/Images/Slideshow/Foto1.png',
      position: 'center top',
      label: 'Dit ben ik',
      note: 'Dit ben ik dus. Meestal achter een scherm, anders waarschijnlijk op de motor.',
    },
    {
      src: 'Assets/Images/Slideshow/Foto2.png',
      position: 'center 58%',
      label: 'Even weg',
      note: 'Soms is een goede rit precies genoeg om mijn hoofd leeg te maken.',
    },
    {
      src: 'Assets/Images/Slideshow/Foto3.jpg',
      position: 'center 50%',
      label: 'Even langs de beker',
      note: 'Deze moest natuurlijk even op de foto.',
    },
    {
      src: 'Assets/Images/Slideshow/Foto4.jpg',
      position: 'center 48%',
      label: 'Op de motor',
      note: 'Hier begon het motorrijden voor mij eigenlijk een beetje.',
    },
    {
      src: 'Assets/Images/Slideshow/Foto5.png',
      position: 'center 50%',
      label: 'Even wat anders',
      note: 'Auto’s, circuit en een helm op. Prima combinatie.',
    },
  ];

  currentIndex = 0;
  paused = false;
  private intervalId?: number;

  ngOnInit(): void {
    this.startAutoplay();
  }
  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  @HostListener('document:keydown.arrowright')
  onArrowRight(): void {
    this.nextSlide();
  }

  @HostListener('document:keydown.arrowleft')
  onArrowLeft(): void {
    this.previousSlide();
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.restartAutoplay();
  }

  previousSlide(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.restartAutoplay();
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.restartAutoplay();
  }

  setPaused(paused: boolean): void {
    this.paused = paused;
    paused ? this.stopAutoplay() : this.startAutoplay();
  }

  private startAutoplay(): void {
    if (this.intervalId || this.paused) return;
    this.intervalId = window.setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    }, 5000);
  }

  private stopAutoplay(): void {
    if (this.intervalId !== undefined) {
      window.clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  private restartAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }
}
