import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Institution, Admin } from '../models/current-user-model';
import { CurrentUserService } from '../services/current-user.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent {
  institutionId: string = '';
  adminAuth: string = '';
  adminId: string = '';

  constructor(
    private currentUserService: CurrentUserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUserService.institution$.subscribe(
      (institution: Institution) => {
        this.institutionId = institution.id;
      }
    );

    this.currentUserService.admin$.subscribe((admin: Admin) => {
      this.adminAuth = admin.authorization;
      this.adminId = admin.id;
    });
  }

  onClick(usertype: string) {
    this.router.navigate([`/${usertype}`, this.institutionId, this.adminId]);
  }
}
