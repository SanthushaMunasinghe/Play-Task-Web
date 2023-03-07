import { Component, Input } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css'],
})
export class DashboardCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() url: string = '';
  @Input() institutionId: string = '';
  @Input() userId: string = '';

  constructor(private router: Router) {}

  onClick() {
    this.router.navigate([this.url, this.institutionId, this.userId]);
  }
}
