import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
})
export class PageTitleComponent implements OnInit {
  public label: string = '';
  public icon: string = '';

  public constructor(private router: Router) {}

  public ngOnInit(): void {
    const targetRoute = this.router.config.find(
      (route) => `/${route.path}` === this.router.url
    );

    this.label = targetRoute ? String(targetRoute.title) : '<No Title>';
    this.icon = targetRoute ? String(targetRoute.data?.['icon']) : '';
  }
}
