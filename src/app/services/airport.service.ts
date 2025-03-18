import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AirportService {
  private baseUrl = 'http://localhost:8000/api'; 

  constructor(private http: HttpClient) {}

 
  getAirports(page: number, perPage: number = 15): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/airport-details?per_page=${perPage}&page=${page}`);
  }

  getAirportDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/airports/${id}`);
  }
}

