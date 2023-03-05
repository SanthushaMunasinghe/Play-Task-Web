import { Component, Input } from '@angular/core';

interface NavLinks {
  link: string;
  text: string;
}

@Component({
  selector: 'app-navbar-default',
  templateUrl: './navbar-default.component.html',
  styleUrls: ['./navbar-default.component.css'],
})
export class NavbarDefaultComponent {
  @Input() navIndex: number = 0;

  navLinks: NavLinks[] = [
    { link: '', text: 'Home' },
    { link: '/about', text: 'About' },
    { link: '/login', text: 'Login' },
  ];
}
