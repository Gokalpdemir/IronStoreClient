import { Component,OnInit,ViewChild  } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  
  ngOnInit(): void {
  }
  @ViewChild('drawer') drawer: MatDrawer;
    isSidebarOpen: boolean = true;

    toggleSidebar() {
        this.drawer.toggle();
        this.isSidebarOpen = !this.isSidebarOpen;
}}
