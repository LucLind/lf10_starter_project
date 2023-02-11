import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-service-page',
  templateUrl: './employee-service-page.component.html',
  styleUrls: ['./employee-service-page.component.css']
})
export class EmployeeServicePageComponent {


  OnTabClicked($event: MouseEvent, arg1: string) {
    console.log('OnTabClicked', arg1);

    var showElement: HTMLElement | null = null;
    var hideElement: HTMLElement | null = null;

    if (arg1 === 'employee') {
      showElement = document.getElementById('employee-list') || null;
      hideElement = document.getElementById('qualification-list') || null;
      document.getElementById('employee-tab-button')?.classList.add('button-tab-active');
      document.getElementById('qualification-tab-button')?.classList.remove('button-tab-active');
    }
    else if (arg1 === 'qualification') {
      showElement = document.getElementById('qualification-list') || null;
      hideElement = document.getElementById('employee-list') || null;
      document.getElementById('employee-tab-button')?.classList.remove('button-tab-active');
      document.getElementById('qualification-tab-button')?.classList.add('button-tab-active');
    }

    if (showElement && hideElement) {
      showElement.classList.remove('hidden');
      hideElement.classList.add('hidden');
      showElement.classList.add('visible');
      hideElement.classList.remove('visible');
    }
  }

}
