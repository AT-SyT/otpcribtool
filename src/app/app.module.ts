import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HelperService} from './helpers.service';
import {CipherGridComponent} from './cipher-grid/cipher-grid.component';
import {CipherGridElementComponent} from './cipher-grid/cipher-grid-element';
import {CribtoolInputComponent} from './cribtool-input/cribtool-input.component';
import {CribtoolAttackComponent} from './cribtool-attack/cribtool-attack.component';
import {AppRoutingModule} from './app-routing.module';
import {DataService} from './data.service';
import {KeyViewComponent} from './key-view/key-view.component';
import {KeyViewElementComponent} from './key-view/key-view-element';

@NgModule({
  declarations: [
    AppComponent,
    CipherGridComponent,
    CipherGridElementComponent,
    CribtoolInputComponent,
    CribtoolAttackComponent,
    KeyViewComponent,
    KeyViewElementComponent,
  ],
  imports     : [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers   : [HelperService, DataService],
  bootstrap   : [AppComponent]
})
export class AppModule {
}
