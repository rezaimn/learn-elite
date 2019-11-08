import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import {ParticlesModule} from "angular-particle";
import {GlobalVariables} from "./shared/services/globalVariables";
import {APIService} from "./shared/services/API-Service";
import {FormsModule} from "@angular/forms";
import {Ng2Webstorage} from 'ngx-webstorage';
import {LandingHeaderComponent} from "./landing-header/landing-header.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {VerifyAccountComponent} from "./landing/verify-account/verify-account.component";
import {ErrorMessageService} from "./shared/services/error-message-service";
import {ToastrModule} from "ngx-toastr";

// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-angular/SB-Admin-BS4-Angular-6/master/dist/assets/i18n/',
        '.json'
    ); */
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};
@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule,
        ParticlesModule,
        FormsModule,
        Ng2Webstorage,
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-top-full-width',
            closeButton: true,
            easing: 'ease-in',
            iconClasses: {
                error: 'toast-error',
                info: 'toast-info',
                success: 'toast-success',
                warning: 'toast-warning',
            },
            tapToDismiss: true,
            preventDuplicates: true

        }),

    ],
    declarations: [
        AppComponent,
        LandingHeaderComponent,
        SidebarComponent,
        VerifyAccountComponent
    ],
    providers: [AuthGuard,APIService,GlobalVariables,ErrorMessageService],
    bootstrap: [AppComponent]
})
export class AppModule {}
