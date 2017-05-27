import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { WelcomeComponent } from './../pages/welcome/welcome-component';


export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // set our app's pages
  public appPages: PageInterface[] = [
    { title: 'خانه', component: TabsPage, icon: 'home' },
    { title: 'عضویت', component: TabsPage, index: 1, icon: 'contacts' },
    { title: 'ارسال متن', component: TabsPage, index: 2, icon: 'paper-plane' },
    { title: 'تنظیمات', component: TabsPage, index: 3, icon: 'build' }
  ];

 // rootPage = TabsPage;
    public rootPage = WelcomeComponent;


  constructor(platform: Platform, public menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

  }

  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario

    this.menu.close();

    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index });

    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }


  }

}
