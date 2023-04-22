import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { INavlink } from './sidebar.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public navlinksData: INavlink[] = [];

  public constructor(private router: Router) {}

  public ngOnInit(): void {
    this.router.config.forEach((route) => {
      this.navlinksData.push({
        label: String(route.title),
        path: String(route.path),
        icon: String(route.data?.['icon']),
      });
    });
  }

  public isNavlinkActive(navlinkPath: string): boolean {
    return this.router.url === `/${navlinkPath}`;
  }
}
