import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header.component";
import { IonicModule } from "@ionic/angular";
import { HeaderCondenseComponent } from "./header-condense.component";

@NgModule({
    imports: [
        IonicModule,
    ],
    exports: [
        HeaderComponent,
        HeaderCondenseComponent
    ],
    declarations: [
        HeaderComponent,
        HeaderCondenseComponent
    ]
})

export class HeaderModule {}