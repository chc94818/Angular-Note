import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DataBinding';
  stringImterpolationValue = 'This is the string from imterpolation'
  idNum = 1;
  idBinding = 'id-for-property-binding';
  clickNum = 0;
  twoWayValue = '';

  constructor() {
    setInterval(()=>{
      this.idNum++;
    }, 2000);
  }

  getIdBindingString = () => {
    return this.idBinding + '-' + this.idNum;
  }

  getStringImterpolationValue = () => {
    return this.stringImterpolationValue + ' (get from funciton)';
  }

  onClick = () => {
    this.clickNum++;
  }
}
