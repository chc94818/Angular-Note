import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Directives';
  color = '';
  show1 = true;
  show2 = false;
  list = ['first list itme',' 2 list item content', 'third message'];
  users = ['hi1','hi2','user3'];
}
