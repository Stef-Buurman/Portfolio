import { Injectable, signal } from '@angular/core';

export type ToastKind = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  timeOut?: number;
  closeButton?: boolean;
  progressBar?: boolean;
}

export interface ToastMessage {
  id: number;
  kind: ToastKind;
  title: string;
  message: string;
  timeOut: number;
  closeButton: boolean;
  progressBar: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly defaultOptions: Required<ToastOptions> = {
    timeOut: 4500,
    closeButton: true,
    progressBar: true,
  };

  private nextId = 1;
  private readonly timers = new Map<number, ReturnType<typeof setTimeout>>();
  private readonly toastState = signal<ToastMessage[]>([]);

  readonly toasts = this.toastState.asReadonly();

  showSuccess(
    message: string,
    title = 'Success',
    options?: ToastOptions,
  ): void {
    this.show('success', message, title, options);
  }

  showError(message: string, title = 'Error', options?: ToastOptions): void {
    this.show('error', message, title, options);
  }

  showWarning(
    message: string,
    title = 'Warning',
    options?: ToastOptions,
  ): void {
    this.show('warning', message, title, options);
  }

  showInfo(message: string, title = 'Info', options?: ToastOptions): void {
    this.show('info', message, title, options);
  }

  dismiss(id: number): void {
    const timer = this.timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }

    this.toastState.update((items) => items.filter((toast) => toast.id !== id));
  }

  private show(
    kind: ToastKind,
    message: string,
    title: string,
    options?: ToastOptions,
  ): void {
    const settings = { ...this.defaultOptions, ...options };
    const id = this.nextId++;

    const toast: ToastMessage = {
      id,
      kind,
      title,
      message,
      ...settings,
    };

    this.toastState.update((items) => [...items, toast]);

    if (settings.timeOut > 0) {
      const timer = setTimeout(() => this.dismiss(id), settings.timeOut);
      this.timers.set(id, timer);
    }
  }
}
