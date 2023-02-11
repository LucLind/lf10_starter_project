import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchTerm: string = '';

  @Output()
  searchTermChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  onSearchTermChanged() {
    this.searchTermChanged.emit(this.searchTerm);
  }
}
