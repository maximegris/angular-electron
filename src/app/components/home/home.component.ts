import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = `App works !`;

  constructor() { }

  ngOnInit() {
  }

  /**
  * @param {string} name  Hello you!
  *
  * ``` typescript
  * sayHelloTo('jude');
  * ```
  *
  */
  sayHelloTo(name: string) {
    console.log(`Hello ${name}!`);
  }

}
