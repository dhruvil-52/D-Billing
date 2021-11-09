import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Injectable({
  providedIn: 'root'
})
export class DialogService {
  public defaultConfiguration = {
    keyboard: false,
    backdrop: true,
    size: 'lg',
    windowClass: ''
  }
  constructor(private modalService: NgbModal) { }

  public dialog(component, dialogData, config) {
    if (config === undefined || config === {}) {
      config = this.defaultConfiguration;
    }
    const modalRef = this.modalService.open(component, config);
    modalRef.componentInstance.data = dialogData;
    return modalRef;
  }
}
