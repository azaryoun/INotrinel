import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { New } from './../../models/new';
import { News } from './../../models/news';
import { NewsService } from './../../providers/news-service';

@Component({
  selector: 'news-detail-component',
  templateUrl: 'news-detail-component.html'
})
export class NewsDetailComponent {


  public theNew: New = null;

  public isloaded: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _newsService: NewsService, private _loadingController: LoadingController) {

    let oNews: News = navParams.data.newsData;

    let loader = this._loadingController.create({
      content: " ارتباط با سرویس دهنده ...",
      dismissOnPageChange: false
    });

    loader.present();
    this.isloaded = false;

    _newsService.getNew(oNews.id).subscribe(data => {

      this.theNew = data;
      loader.dismiss();
      this.isloaded = true;
    });


  }

}
