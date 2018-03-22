import { MatToolbarModule } from '@angular/material/toolbar';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  navLinks = [
    {
      path: 'items',
      label: 'Manage Items'
    },
    {
      path: '/customers',
      label: 'Manage Customers'
    },
    {
      path: '/new-item',
      label: 'New item'
    },
    {
      path: '/invoicing',
      label: 'New Invoice'
    }
  ];

  constructor() {}

  ngOnInit() {}

  openAddItem() {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    // Create a browser window
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      center: true,
      resizable: false,
      titleBarStyle: 'hiddenInset',
      transparent: false
    });
    // Load the page + route
    win.loadURL('file://' + __dirname + '/index.html#/add-item');
  }
}
