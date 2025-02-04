import { Injectable } from "@angular/core";
import { ToastrService, IndividualConfig } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private defaultPanelSettings: Partial<IndividualConfig> = {
    closeButton: true,
    timeOut: 5000,
    positionClass: 'toast-bottom-right',
    progressBar: true
  };

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title: string = "Success", panelSettings: Partial<IndividualConfig> = this.defaultPanelSettings) {
    this.toastr.success(message, title, panelSettings);
  }

  showError(message: string, title: string = "Error", panelSettings: Partial<IndividualConfig> = this.defaultPanelSettings) {
    this.toastr.error(message, title, panelSettings);
  }

  showWarning(message: string, title: string = "Warning", panelSettings: Partial<IndividualConfig> = this.defaultPanelSettings) {
    this.toastr.warning(message, title, panelSettings);
  }

  showInfo(message: string, title: string = "Info", panelSettings: Partial<IndividualConfig> = this.defaultPanelSettings) {
    this.toastr.info(message, title, panelSettings);
  }
}
