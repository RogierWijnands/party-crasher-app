import { Input, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";

export abstract class HeaderBaseComponent implements OnInit {
    @Input() public title: string;

    protected constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.router.events.subscribe((routerEvent) => {
            if (routerEvent instanceof NavigationEnd) {
                if (this.activatedRoute.snapshot.data && this.activatedRoute.snapshot.data.title && typeof this.title === 'undefined') {
                    this.title = this.activatedRoute.snapshot.data.title;
                }
            }
        });
    }
}