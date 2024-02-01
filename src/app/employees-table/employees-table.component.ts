import { Component, EventEmitter, OnInit } from '@angular/core';
import { Result } from '../employees/interfaces/empdata.interface';
import { CommonModule } from '@angular/common';
import { DataService } from '../employees/services/data.service';

@Component({
  selector: 'app-employees-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.css'
})
export class EmployeesTableComponent implements OnInit{

  currentPage: number = 1;
  startPage: number = 0;
  endPage: number = 5;
  pageSize: number = 5;
  pageSizes : number[] = [5,10,20];

  employees: Result[] = [
    {
      Compliance: '100', Countryname: 'Colombia', EmpId: '00000001', Mandt: '', Name: 'George Washington',
      Address: 'Patagonia', Salary: '500', Curcode: 'COP'
    },
    {
      Compliance: '99', Countryname: 'Mexico', EmpId: '00000002', Mandt: '',
      Name: 'Pepito Perez', Address: 'Far far away', Salary: '999', Curcode: 'MXN'
    },
  {
    Compliance: '100', Countryname: 'Colombia', EmpId: '00000003', Mandt: '', Name: 'George Washington',
    Address: 'Patagonia', Salary: '500', Curcode: 'COP'
  },
  {
    Compliance: '99', Countryname: 'Mexico', EmpId: '00000004', Mandt: '', Name: 'Pepito Perez',
    Address: 'Far far away', Salary: '999', Curcode: 'MXN'
  },
  {
    Compliance: '100', Countryname: 'Colombia', EmpId: '00000005', Mandt: '', Name: 'George Washington',
    Address: 'Patagonia', Salary: '500', Curcode: 'COP'
  },
  {
    Compliance: '99', Countryname: 'Mexico', EmpId: '00000006', Mandt: '', Name: 'Pepito Perez',
    Address: 'Far far away', Salary: '999', Curcode: 'MXN'
  },
  {
    Compliance: '99', Countryname: 'Mexico', EmpId: '00000007', Mandt: '', Name: 'Pepito Perez',
    Address: 'Far far away', Salary: '999', Curcode: 'MXN'
  },
  {
    Compliance: '99', Countryname: 'Mexico', EmpId: '00000008', Mandt: '', Name: 'Pepito Perez',
    Address: 'Far far away', Salary: '999', Curcode: 'MXN'
  },
  {
    Compliance: '99', Countryname: 'Mexico', EmpId: '00000009', Mandt: '', Name: 'Pepito Perez',
    Address: 'Far far away', Salary: '999', Curcode: 'MXN'
  },
  {
    Compliance: '99', Countryname: 'Mexico', EmpId: '00000010', Mandt: '', Name: 'Pepito Perez',
    Address: 'Far far away', Salary: '999', Curcode: 'MXN'
  },
  {
    Compliance: '99', Countryname: 'Mexico', EmpId: '00000011', Mandt: '', Name: 'Pepito Perez',
    Address: 'Far far away', Salary: '999', Curcode: 'MXN'
  },
  {
    Compliance: '99', Countryname: 'Mexico', EmpId: '00000012', Mandt: '', Name: 'Pepito Perez',
    Address: 'Far far away', Salary: '999', Curcode: 'MXN'
  },
  ]

  filteredEmployees: Result[] = this.employees;

  constructor( private dataService: DataService ){}

  ngOnInit(): void {
    // Test if ngAfterviewiNIT works
    this.loadEmployeeData();
    this.visibleData();
  }

  visibleData(){
    //My logic
    //return this.employees.slice(this.startPage,this.endPage);

    //His logic
    const startIndex = (this.currentPage - 1) * this.pageSize
    const endIndex = startIndex + this.pageSize;
    return this.filteredEmployees.slice(startIndex,endIndex);
  }

  nextPage(){
    // My Logic
    //const curPage = this.currentPage+1;
    //const start = this.pageSize*( curPage - 1 );
    //const end = start + this.pageSize;
    //if(start>=this.employees.length) return;
    //this.currentPage = curPage;
    //this.startPage = start;
    //this.endPage = end;
    //console.log({ "start": start, "end": end, "curPage": curPage });

    //His Logic
    this.currentPage++;
    this.visibleData();
  }

  previousPage(){
    //My Logic
    //if(this.currentPage === 1) return;
    //this.currentPage--;
    //const start = this.pageSize*( this.currentPage - 1 );
    //const end = start + this.pageSize;
    //this.startPage = start;
    //this.endPage = end;
    //console.log({ "start": start, "end": end, "curPage": this.currentPage });

    //His logic
    if(this.currentPage === 1) return;
    this.currentPage--;
    this.visibleData();
  }

  pageNumbers(){
    if(this.pageSize == 0) return;

    let totalPages = this.filteredEmployees.length / this.pageSize;
    totalPages = Math.ceil(totalPages);
    return new Array(totalPages);

  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.visibleData();
  }

  filterData(searchTerm:string):void{
    // Este filtro es muy diferente al del video, ensayarlo a ver si funciona
    this.filteredEmployees = this.employees.filter((item)=>{
      return item.Name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  loadEmployeeData(){

    this.dataService.getEmpData().subscribe(
      data => {
        this.filteredEmployees = data.d.results
      }
    );
  }

  changePageSize(event:Event):void{
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.pageSize = parseInt(selectedValue, 10);
  }

}
