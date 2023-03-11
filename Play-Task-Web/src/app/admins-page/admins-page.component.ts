import { Component } from '@angular/core';

import { Institution, Admin } from '../models/current-user-model';
import { CurrentUserService } from '../services/current-user.service';

@Component({
  selector: 'app-admins-page',
  templateUrl: './admins-page.component.html',
  styleUrls: ['./admins-page.component.css'],
})
export class AdminsPageComponent {
  institutionId: string = '';
  adminAuth: string = '';

  constructor(private currentUserService: CurrentUserService) {}

  ngOnInit() {
    this.currentUserService.institution$.subscribe(
      (institution: Institution) => {
        this.institutionId = institution.id;
      }
    );

    this.currentUserService.admin$.subscribe((admin: Admin) => {
      this.adminAuth = admin.authorization;
    });
  }
}
