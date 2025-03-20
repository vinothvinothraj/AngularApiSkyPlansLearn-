import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchable-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './searchable-dropdown.component.html',
  styleUrls: ['./searchable-dropdown.component.css'],
})
export class SearchableDropdownComponent {
  @Input() items: string[] = [];
  @Input() placeholder: string = 'Select an option';
  @Output() selected = new EventEmitter<string>();

  dropdownOpen = signal(false);
  searchQuery = signal('');
  selectedItem: string | null = null;

  toggleDropdown() {
    this.dropdownOpen.set(!this.dropdownOpen());
  }

  selectItem(item: string) {
    this.selectedItem = item;
    this.selected.emit(item);
    this.dropdownOpen.set(false);
    this.searchQuery.set('');
  }

  filteredItems(): string[] {
    return this.items.filter((item) =>
      item.toLowerCase().includes(this.searchQuery().toLowerCase())
    );
  }
}
