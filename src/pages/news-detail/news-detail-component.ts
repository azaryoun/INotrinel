import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {News} from './../../models/news';

@Component({
  selector: 'news-detail-component',
  templateUrl: 'news-detail-component.html'
})
export class NewsDetailComponent {

  public news:News;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.news = navParams.data.newsData;
  }

}
