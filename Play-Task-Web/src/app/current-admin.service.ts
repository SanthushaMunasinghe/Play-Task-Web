import { Injectable } from '@angular/core';

interface Admin {
  id: string;
  name: string;
  authorization: string;
}

@Injectable({
  providedIn: 'root',
})
export class CurrentAdminService {
  admin: any;

  constructor() {}
}
