import { Component, OnInit } from '@angular/core';
import { Friend } from '../shared/models/friend.model';

@Component({
  selector: 'friends-component',
  templateUrl: 'friends.component.html'
})
export class FriendsComponent implements OnInit {
  public friends: Friend[];

  constructor() {}

  ngOnInit() {
    
  }

}
