import { Component } from '@angular/core';


import { NavController, NavParams, LoadingController } from 'ionic-angular';


import { Observable } from 'rxjs/Rx';

import { NewsService } from './../../providers/news-service';

import { NewsDetailComponent } from './../news-detail/news-detail-component'

import { News } from './../../models/news';

//import { NavController } from 'ionic-angular';

@Component({
  selector: 'home-component',
  templateUrl: 'home-component.html'
})
export class HomeComponent {

  private newses: Array<News> = [];

  constructor(public navCtrl: NavController, private newsService: NewsService, private _loadingController: LoadingController) {

    let loader = this._loadingController.create({
      content: "Connecting to Server ... ",
      dismissOnPageChange: false,
    });

    loader.present();


    this.newsService.getNews().subscribe(data => {
      this.newses = data;



      loader.dismiss();
    });

  }
  goNewsDetail(news) {
    this.navCtrl.push(NewsDetailComponent, { newsData: news });
  }


  searchNews(event) {
    // Reset items back to all of the items


    let queryString = event.target.value;
    if (queryString !== undefined) {
      if (queryString.trim() == '') {
        this.resetList(event);
        return;
      }

      if (queryString.length<=3){
        return;
      }

      let loader = this._loadingController.create({
        content: "Connecting to Server ... ",
        dismissOnPageChange: true,
      });

      loader.present();


      this.newsService.getNewsFiltered(queryString).subscribe(data => {
        this.newses = data;
        loader.dismiss();
      })
    }


    // set queryString to the value of the searchbar

  }

  resetList(event) {
    let loader = this._loadingController.create({
      content: "Connecting to Server ... ",
      dismissOnPageChange: true,
    });

    loader.present();
    this.newsService.getNews().subscribe(data => {
      this.newses = data;
      loader.dismiss();
    });


  }



}