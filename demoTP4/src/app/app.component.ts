import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demoTP4';

  actions: Array<any> = [
    { name: 'Home', link: 'home', icon: 'house' },
    { name: 'Products', link: 'products', icon: 'search' },
    { name: 'New Products', link: 'newProducts', icon: 'plus' }
  ];

  currentAction: any;

  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}
