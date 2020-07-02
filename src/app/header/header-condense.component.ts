import { Component } from "@angular/core";
import { HeaderBaseComponent } from "./header-base.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'header-condense-component',
    templateUrl: 'header-condense.component.html'
})

export class HeaderCondenseComponent extends HeaderBaseComponent {
    constructor(
        router: Router,
        activatedRoute: ActivatedRoute,
    ) {
        super(router, activatedRoute);
    }
}