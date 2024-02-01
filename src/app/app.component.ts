import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesTableComponent } from './employees-table/employees-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  providers:[HttpClientModule],
  imports: [CommonModule, RouterOutlet, EmployeesTableComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'employees';
}
