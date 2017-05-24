import { Component } from '@angular/core';


import { NavController, NavParams } from 'ionic-angular';


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

  constructor(public navCtrl: NavController, private newsService: NewsService) {

    this.newsService.getNews().subscribe(data => {
      this.newses = data;
    });

  }
  goNewsDetail(newsData) {
    this.navCtrl.push(NewsDetailComponent, { newsData: newsData });
  }


  searchNews(event) {
    // Reset items back to all of the items


    let queryString = event.target.value;
    if (queryString !== undefined) {
      if (queryString.trim() == '') {
        this.resetList(event);
      }
      this.newsService.getNewsFiltered(queryString).subscribe(data => {
        this.newses = data;
      })
    }


    // set queryString to the value of the searchbar

  }

  resetList(event) {
    this.newsService.getNews().subscribe(data => {
      this.newses = data;
    });


  }



}