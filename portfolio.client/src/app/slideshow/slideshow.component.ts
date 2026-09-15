import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

interface PortfolioSlide {
  src: string;
  position: string;
  label: string;
  note: string;
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
      src: 'Assets/Images/Mijzelf/Foto5.jpg',
      position: 'center 10%',
      label: 'Dit ben ik',
      note: 'Gewoon een verzameling van dingen waar ik graag tijd in steek.',
    },
    {
      src: 'Assets/Images/Mijzelf/MotorRoad.png',
      position: 'center 58%',
      label: 'Even weg',
      note: 'Soms is een goede rit precies genoeg om mijn hoofd leeg te maken.',
    },
    {
      src: 'Assets/Images/Mijzelf/Foto2.jpg',
      position: 'center 48%',
      label: 'Op de motor',
      note: 'Eén van de dingen waar ik buiten code het meest van geniet.',
    },
    {
      src: 'Assets/Images/Mijzelf/Foto3.jpg',
      position: 'center 42%',
      label: 'Nog zo’n moment',
      note: 'Niet alles hoeft gepland te zijn om een goede herinnering te worden.',
    },
    {
      src: 'Assets/Images/Mijzelf/foto1.png',
      position: 'center 50%',
      label: 'Een mooie dag',
      note: 'Soms is het gewoon een kwestie van geluk hebben met het weer.',
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
