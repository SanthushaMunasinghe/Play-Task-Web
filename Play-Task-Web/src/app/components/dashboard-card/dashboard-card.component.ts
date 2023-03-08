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

  institution: Institution = { id: '', name: '' };
  admin: Admin = { id: '', name: '', authorization: '' };

  constructor(
    private router: Router,
    private currentUserService: CurrentUserService
  ) {}

  onClick() {
    this.router.navigate([this.url, this.institution.id, this.admin.id]);
  }

  ngOnInit() {
    this.currentUserService.institution$.subscribe(
      (institution: Institution) => {
        this.institution = institution;
      }
    );

    this.currentUserService.admin$.subscribe((admin: Admin) => {
      this.admin = admin;
    });
  }
}
