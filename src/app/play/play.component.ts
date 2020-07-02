import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'play-component',
  templateUrl: 'play.component.html',
})
export class PlayComponent implements OnInit {
  public title: string;

  constructor() {}

  ngOnInit() {
    setTimeout(() => this.title = 'test123', 5000)
  }

}
