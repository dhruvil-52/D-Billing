import { Component, OnInit } from '@angular/core';
import { CommunticationService } from '../services/communtication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(private communicationService: CommunticationService, private router: Router) { }

  menuItems = [
    {
      label: 'Make Bill',
      icon: 'chrome_reader_mode',
      url: "/"
    },
    {
      label: 'Add Item',
      icon: 'add_shopping_cart',
      url: '/purchase'
    },
    {
      label: 'Remaining Item',
      icon: 'shopping_cart',
      url: '/purchase/remaining-item'
    },
    {
      label: 'Customer',
      icon: 'supervised_user_circle',
      url: '/customer'
    },
    {
      label: 'Payment',
      icon: 'attach_money',
      url: '/payment'
    },
    {
      label: 'Bill History',
      icon: 'library_books',
      url: '/payment/bill/history'
    },
    {
      label: '',
      icon: ''
    },
    {
      label: 'My Profile',
      icon: 'account_box',
      url: '/my-profile'
    },
    {
      label: 'About Us',
      icon: 'call',
      url: '/about-us'
    },
  ];

  public tabName: string;
  public generatePDF() {

  }

  public routing(url?) {
    if (url) {
      this.router.navigate([url])
    }
  }

  ngOnInit(): void {
    this.tabName = this.communicationService.currentTab
  }

}
