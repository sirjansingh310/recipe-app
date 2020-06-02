import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AlertComponent } from './shared/alert/alert.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
// make sure imports on the top don't contain any unwanted imports. if we lazy load a module but import the ts file in the top, it will anyways be bundled.
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent,
  ],
  imports: [// eager loading all uncommented. everything bundeled together in app.module
    BrowserModule,
    HttpClientModule,
   // RecipeModule,// lazy loaded check app-routing.module.ts
  //  ShoppingListModule,
    SharedModule,
    CoreModule,
    AuthModule,
    AppRoutingModule// should be last as all other modules have configured their own routes in themselves/their own routingmodules. Routes at the end are genereated after compiling all these modules from top to bottom, app-routing module contains wildcard(**), so should be at last
  ],
  // we can either create a service with @Injectable({providedIn: 'root'}) or declare them here in providers array. If we are providing them in providers array, we can create a core.module.ts file and import it here
 // providers: [RecipeService, ShoppingListService, {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true}],
  bootstrap: [AppComponent],

  entryComponents: [
    AlertComponent // declaring this in entry components list allows us to manually inject alert component into the dom in ts file. check login.component.ts
                  // this is not required for angular 9+. we are using angular 8 for this project. Check package.json
  ]
})
export class AppModule { }
