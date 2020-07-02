import { Component, Input } from "@angular/core";

@Component({
    selector: 'header-component',
    templateUrl: 'header.component.html'
})

export class HeaderComponent {
    @Input() public title: string;
}