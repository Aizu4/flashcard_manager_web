import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { JwtModule } from "@auth0/angular-jwt";
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {HomeComponent} from './home/home.component';
import {MatCardModule} from "@angular/material/card";
import {DeckComponent} from "./deck/deck.component";
import {MiniDeckComponent} from "./home/mini_deck/mini_deck.component";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {ToolbarComponent} from './toolbar/toolbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterModule, Routes} from "@angular/router";
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatTableModule} from "@angular/material/table";
import { CardTableComponent } from './deck/card-table/card-table.component';
import { CardDetailComponent } from './deck/card-detail/card-detail.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'deck/:id', component: DeckComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DeckComponent,
    ToolbarComponent,
    LoginComponent,
    MiniDeckComponent,
    CardTableComponent,
    CardDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("token");
        },
        allowedDomains: ["localhost:8000"],
      },
    }),
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule.forRoot(routes),
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatTableModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
