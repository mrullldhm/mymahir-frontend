import { Component, OnInit } from '@angular/core';
import { SharedModules } from '../../shared/shared.modules';
import { Api } from '../../services/api';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { Data } from '../../services/data';

interface StudentItem {
  id: number;
  name: string;
  student_no: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-student-page',
  standalone: true,
  imports: [...SharedModules, RouterLink],
  templateUrl: './student-page.html',
  styleUrl: './student-page.scss',
})
export class StudentPage implements OnInit {
  public studentData: StudentItem[] = [];

  public dataSource = new MatTableDataSource(this.studentData);
  public displayedColumns: string[] = ['no', 'name', 'student_no', 'actions'];

  constructor(private apiService: Api, private dataService: Data, private router: Router) {}

  async ngOnInit() {
    try {
      let response: any = await this.apiService.httpGet('/students');
      console.log('response ==>', response);
      this.studentData = response.data;
      this.dataSource = new MatTableDataSource(this.studentData);
      this.dataSource.data = this.dataSource.data.map((student, index) => ({
        ...student,
        no: index + 1,
      }));
    } catch (err) {
      console.error('Error: ', err);
    }
  }

  onLogout() {
    this.dataService.deleteStorage('token');
    this.router.navigateByUrl('/login');
  }
}
