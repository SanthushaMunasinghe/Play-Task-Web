import { Component } from '@angular/core';

import { Institution, Admin } from '../models/current-user-model';
import { CurrentUserService } from '../services/current-user.service';

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic-page.component.html',
  styleUrls: ['./topic-page.component.css'],
})
export class TopicPageComponent {
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
