import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header.component";
import { IonicModule } from "@ionic/angular";
import { HeaderCondenseInactiveComponent } from "./header-condense-inactive.component";

@NgModule({
    imports: [
        IonicModule,
    ],
    exports: [
        HeaderComponent,
        HeaderCondenseInactiveComponent
    ],
    declarations: [
        HeaderComponent,
        HeaderCondenseInactiveComponent
    ]
})

export class HeaderModule {}