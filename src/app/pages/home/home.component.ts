import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchableDropdownComponent } from '../../components/searchable-dropdown/searchable-dropdown.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchableDropdownComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  items = ['Apple', 'Banana', 'Cherry', 'Date', 'Grapes', 'Mango', 'Orange'];
  selectedValue: string | null = null;

  onItemSelected(value: string) {
    this.selectedValue = value;
  }
}
