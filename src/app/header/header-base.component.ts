import { Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { EventEmitter } from '@angular/core';

export abstract class HeaderBaseComponent implements OnInit {
    @Input() public title: string;
    @Input() public isModal: boolean;
    @Output() public onModalClose: EventEmitter<void> = new EventEmitter();

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

    public closeModal(): void {
        this.onModalClose.emit();
    }
}