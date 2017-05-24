import { Component } from '@angular/core';


import { NavController, NavParams } from 'ionic-angular';


import { Observable } from 'rxjs/Rx';

import { ParkData } from './../../app/providers/park-data';

import { ParkDetails } from './../park-details/park-details'

//import { NavController } from 'ionic-angular';

@Component({
  selector: 'home-component',
  templateUrl: 'home-component.html',
  styleUrls:['home-component.html']
})
export class HomeComponent { parks: Array<Object> = []
  constructor(public navCtrl: NavController, private parkData: ParkData) {

    this.parkData.load().subscribe(data => {
      this.parks = data;
    });

  }
  goParkDetails(theParkData) {
    this.navCtrl.push(ParkDetails, { parkData: theParkData });
  }


  getParks(event) {
    // Reset items back to all of the items
    this.parkData.load().subscribe(data => {
      this.parks = data;
    });
    // set queryString to the value of the searchbar
    let queryString = event.target.value;
    if (queryString !== undefined) {
      // if the value is an empty string don't filter the items
      if (queryString.trim() == '') {
        return;
      }
      this.parkData.getFilteredParks(queryString).subscribe(theResult => {
        this.parks = theResult;
      })
    }
  }

  resetList(event) {
    // Reset items back to all of the items
    this.parkData.load().subscribe(data => {
      this.parks = data;
    });


  }


  customHeaderFn(record, recordIndex, records) {
    if (recordIndex > 0) {
      if (record.name.charAt(0) !== records[recordIndex - 1].name.charAt(0)) {
        return record.name.charAt(0);
      } else {
        return null;
      }
    } else {
      return record.name.charAt(0);
    }
  }