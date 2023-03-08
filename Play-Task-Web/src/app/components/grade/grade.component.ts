import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

HttpClient;

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css'],
})
export class GradeComponent {
  @Input() number: number = 0;
  @Input() count: number = 0;

  @Input() grade: string = '';

  constructor(private http: HttpClient) {}

  onClick() {
    this.http.delete(`/api/deleteTerm/${this.grade}`).subscribe(
      (res) => {
        this.http.delete(`/api/deleteGrade/${this.grade}`).subscribe(
          (res) => {
            window.location.reload();
          },
          (error) => {
            console.log(error.error);
          }
        );
      },
      (error) => {
        console.log(error.error);
      }
    );
  }
}
