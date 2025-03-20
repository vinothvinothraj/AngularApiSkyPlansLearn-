import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  private baseUrl = 'http://localhost:8000/api'; 

  constructor(private http: HttpClient) {}

 
  getFlights(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/flights`);
  }

  getFlightDetail(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/flights/${id}`);
  }

  createFlight(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/flights`, data);
  }
}
