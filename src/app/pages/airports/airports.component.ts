import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AirportService } from '../../services/airport.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-airports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './airports.component.html',
})
export class AirportsComponent implements OnInit {
  airports: any[] = [];
  currentPage = 1;
  totalPages = 1;
  perPage = 15;
  isModalOpen: boolean = false;
  airportDetails: any = null;
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(private airportService: AirportService) {}

  ngOnInit() {
    this.loadAirports();
  }

  loadAirports() {
    this.airportService.getAirports(this.currentPage, this.perPage).subscribe({
      next: (data) => {
        this.airports = data.data;
        this.totalPages = data.last_page;
      },
      error: (err) => console.error('Error fetching airports', err),
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadAirports();
    }
  }

  onAirportClick(airport: any): void {
    this.isModalOpen = true;
    this.getAirportDetails(airport.id);
  }

  getAirportDetails(id: number): void {
    this.loading = true;
    this.errorMessage = null;
    this.airportService.getAirportDetails(id).subscribe(
      (data) => {
        this.airportDetails = data;
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = 'Failed to fetch airport details';
      }
    );
  }

  close() {
    this.isModalOpen = false;
    this.airportDetails = null;
  }
}
