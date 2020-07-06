import { Component } from "@angular/core";
import { HeaderBaseComponent } from "./header-base.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'header-condense-inactive-component',
    templateUrl: 'header-condense-inactive.component.html'
})

export class HeaderCondenseInactiveComponent extends HeaderBaseComponent {
    constructor(
        router: Router,
        activatedRoute: ActivatedRoute,
    ) {
        super(router, activatedRoute);
    }
}