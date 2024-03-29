import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {JwtModule} from "@auth0/angular-jwt";
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
import {LoginComponent} from './login/login.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatTableModule} from "@angular/material/table";
import {CardTableComponent} from './deck/card-table/card-table.component';
import {CardDetailComponent} from './deck/card-detail/card-detail.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NotFoundComponent} from './not-found/not-found.component';
import {DeckSettingsComponent} from './deck/deck-settings/deck-settings.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {DeckCsvExportComponent} from './deck/deck-settings/deck-csv-export/deck-csv-export.component';
import { CardImageComponent } from './deck/card-detail/card-image/card-image.component';
import {MatSortModule} from "@angular/material/sort";
import { BulkAddDialogComponent } from './deck/bulk-add-dialog/bulk-add-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTabsModule} from "@angular/material/tabs";
import { DeckTagsViewComponent } from './deck/deck-settings/deck-tags-view/deck-tags-view.component';
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";
import {MatLineModule} from "@angular/material/core";
import { DeckTagListElementComponent } from './deck/deck-settings/deck-tags-view/deck-tag-list-element/deck-tag-list-element.component';
import {A11yModule} from "@angular/cdk/a11y";
import { CardTagsComponent } from './deck/card-detail/card-tags/card-tags.component';
import {MatChipsModule} from "@angular/material/chips";
import { DeckViewComponent } from './deck-view/deck-view.component';
import { DeckCsvImportComponent } from './deck/deck-settings/deck-csv-import/deck-csv-import.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', redirectTo: ''},
  {path: 'login', component: LoginComponent},
  {path: 'deck/:id', component: DeckComponent},
  {path: 'view/:slug', component: DeckViewComponent},
  {path: 'not_found', component: NotFoundComponent},
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
    NotFoundComponent,
    DeckSettingsComponent,
    DeckCsvExportComponent,
    CardImageComponent,
    BulkAddDialogComponent,
    DeckTagsViewComponent,
    DeckTagListElementComponent,
    CardTagsComponent,
    DeckViewComponent,
    DeckCsvImportComponent,
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
        MatAutocompleteModule,
        MatTooltipModule,
        MatSelectModule,
        MatCheckboxModule,
        MatSortModule,
        MatDialogModule,
        MatTabsModule,
        MatLegacyChipsModule,
        MatLineModule,
        A11yModule,
        MatChipsModule,
    ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
