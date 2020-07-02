import { Component, Input } from "@angular/core";

@Component({
    selector: 'header-condense-component',
    templateUrl: 'header-condense.component.html'
})

export class HeaderCondenseComponent {
  @Input() public title: string;
}