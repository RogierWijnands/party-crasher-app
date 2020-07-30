import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header.component";
import { IonicModule } from "@ionic/angular";
import { HeaderCondenseInactiveComponent } from "./header-condense-inactive.component";
import { CommonModule } from "@angular/common";
import { HeaderPopoverMenuComponent } from './header-popover-menu.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
    ],
    exports: [
        HeaderComponent,
        HeaderCondenseInactiveComponent
    ],
    declarations: [
        HeaderComponent,
        HeaderCondenseInactiveComponent,
        HeaderPopoverMenuComponent,
    ]
})

export class HeaderModule {}