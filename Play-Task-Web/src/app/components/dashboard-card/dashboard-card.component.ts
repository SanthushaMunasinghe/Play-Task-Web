import { Component, Input } from '@angular/core';

import { Router } from '@angular/router';

import { Institution, Admin } from 'src/app/models/current-user-model';

import { CurrentUserService } from '../../services/current-user.service';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css'],
})
export class DashboardCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() url: string = '';

  institutionId: string = '';
  adminId: string = '';

  constructor(
    private router: Router,
    private currentUserService: CurrentUserService
  ) {}

  onClick() {
    this.router.navigate([this.url, this.institutionId, this.adminId]);
  }

  ngOnInit() {
    this.currentUserService.institution$.subscribe(
      (institution: Institution) => {
        this.institutionId = institution.id;
      }
    );

    this.currentUserService.admin$.subscribe((admin: Admin) => {
      this.adminId = admin.id;
    });
  }
}
