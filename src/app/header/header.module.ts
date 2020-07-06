import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header.component";
import { IonicModule } from "@ionic/angular";
import { HeaderCondenseInactiveComponent } from "./header-condense-inactive.component";
import { CommonModule } from "@angular/common";

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
        HeaderCondenseInactiveComponent
    ]
})

export class HeaderModule {}