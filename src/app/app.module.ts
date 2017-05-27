import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { TextMaskModule } from 'angular2-text-mask';

//Components
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomeComponent } from '../pages/home/home-component';
import { NewsDetailComponent } from '../pages/news-detail/news-detail-component';
import { TabsPage } from '../pages/tabs/tabs';
import { WelcomeComponent } from '../pages/welcome/welcome-component';
import {  LoginComponent } from '../pages/login/login-component';


//Services
import { Http2Service } from './../providers/http2-service';
import { NewsService } from './../providers/news-service';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomeComponent,
    TabsPage,
    NewsDetailComponent,
    WelcomeComponent,
    LoginComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    TextMaskModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomeComponent,
    TabsPage,
    NewsDetailComponent,
    WelcomeComponent,
    LoginComponent
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }
    , Http2Service
    , NewsService

  ]
})
export class AppModule { }
