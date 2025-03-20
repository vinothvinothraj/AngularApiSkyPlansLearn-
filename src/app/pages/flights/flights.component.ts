import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../../services/flights.service';
import { AirportService } from '../../services/airport.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchableDropdownComponent } from '../../components/searchable-dropdown/searchable-dropdown.component';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SearchableDropdownComponent], // ✅ Import ReactiveFormsModule
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css',
})
export class FlightsComponent implements OnInit {
  flights: any[] = [];
  flightForm: FormGroup;
  airportList: string[] = []; // Holds list of airport identifiers

  constructor(
    private flightsService: FlightsService,
    private airportService: AirportService,
    private fb: FormBuilder
  ) {
    this.flightForm = this.fb.group({
      flight_no: [''],
      origin: ['EGLL'], // Default Origin
      destination: ['EGLL'], // Default Destination
      time: [''],
    });
  }

  ngOnInit() {
    this.loadAllFlights();
    this.loadAirports(); // Load airports for dropdowns
  }

  // Load all flights
  loadAllFlights() {
    this.flightsService.getFlights().subscribe((response) => {
      this.flights = response.data;
    });
  }

  // Fetch initial list of airports
  loadAirports() {
    this.airportService.getAirports(1, 10).subscribe((response) => {
      this.airportList = response.data.map((airport: any) => airport.ident);
    });
  }

  // Search and fetch matching airport identifiers
  searchAirports(query: string) {
    this.airportService.searchAndGetAirportIdent(query).subscribe((response) => {
      this.airportList = response.data.map((airport: any) => airport.ident);
    });
  }

  // Update form with selected origin
  onOriginSelected(ident: string) {
    this.flightForm.patchValue({ origin: ident });
  }

  // Update form with selected destination
  onDestinationSelected(ident: string) {
    this.flightForm.patchValue({ destination: ident });
  }

  // Create new flight
  createNewFlight() {
    if (this.flightForm.valid) {
      this.flightsService.createFlight(this.flightForm.value).subscribe((response) => {
        alert('Flight created successfully!');
        this.loadAllFlights();
        this.flightForm.reset({ origin: 'EGLL', destination: 'EGLL' }); // Reset with default values
      });
    }
  }
}
