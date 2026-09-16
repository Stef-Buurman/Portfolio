import { Component, inject } from '@angular/core';
import { ToastService } from '../../Services/ToastService';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.css',
})
export class ToastContainerComponent {
  readonly toastService = inject(ToastService);

  trackById = (_index: number, toast: { id: number }): number => toast.id;
}
