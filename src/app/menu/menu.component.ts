import { Component, OnInit } from '@angular/core';
import { CommunticationService } from '../services/communtication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(private communicationService: CommunticationService) { }

  public tabName: string;
  public generatePDF() {

  }
  ngOnInit(): void {
    this.tabName = this.communicationService.currentTab
  }

}
