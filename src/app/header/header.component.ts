import { Component } from "@angular/core";
import { HeaderBaseComponent } from "./header-base.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'header-component',
    templateUrl: 'header.component.html'
})

export class HeaderComponent extends HeaderBaseComponent {
    constructor(
        router: Router,
        activatedRoute: ActivatedRoute,
    ) {
        super(router, activatedRoute);
    }
}