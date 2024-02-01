import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpData } from '../interfaces/empdata.interface';
import { EmpDetail } from '../interfaces/empdetail.interface';
import { EmpSkills } from '../interfaces/empskills.interface';
import { environtments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class DataService {

  private baseUrl: string = environtments.baseUrl;

  constructor(private http: HttpClient) { }

  getEmpData():Observable<EmpData >{

    const authorizationData = 'Basic' + btoa( environtments.user + ':' + environtments.pass );
    const headerOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': authorizationData
      })
  };

    return this.http.get<EmpData>(`${this.baseUrl}/EmpDataSet`,headerOptions);

  }
  getEmpDetail():Observable<EmpDetail>{

    return this.http.get<EmpDetail>(`${this.baseUrl}/EmpDetailSet`);

  }
  getEmpSkills():Observable<EmpSkills>{

    return this.http.get<EmpSkills>(`${this.baseUrl}/EmpSkillsSet`);

  }
}
