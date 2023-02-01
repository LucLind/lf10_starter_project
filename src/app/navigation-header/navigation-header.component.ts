import { Component, Injectable, Injector, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.css']
})
export class NavigationHeaderComponent {
  @Input() navBackPath:string | undefined;
  @Input() header:string | undefined;

  constructor(){
    this.navBackPath = this.navBackPath;
  }
}
