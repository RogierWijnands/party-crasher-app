import { Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";

export abstract class HeaderBaseComponent implements OnInit, OnChanges {
    @Input() public title: string;

    protected constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.router.events.subscribe((routerEvent) => {
            if (routerEvent instanceof NavigationEnd) {
                if (this.activatedRoute.snapshot.data && this.activatedRoute.snapshot.data.title) {
                    this.title = this.activatedRoute.snapshot.data.title;
                }
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.title && changes.title.previousValue) {
            this.title = changes.title.currentValue;
        }
    }
}