import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabsComponent } from './core/components/tabs/tabs.component';
import { HeaderComponent } from './core/components/header/header.component';

@NgModule({
    declarations: [
        AppComponent,
        TabsComponent,
        HeaderComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
    ],
})
export class AppModule { }
