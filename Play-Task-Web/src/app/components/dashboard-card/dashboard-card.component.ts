import { Component, Input } from '@angular/core';

import { Router } from '@angular/router';

interface Link {
  url: string;
  institutionId: string;
  userId: string;
}

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css'],
})
export class DashboardCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() link: Link = { url: '', institutionId: '', userId: '' };

  constructor(private router: Router) {}

  onClick() {
    this.router.navigate([
      this.link.url,
      this.link.institutionId,
      this.link.userId,
    ]);
  }
}
