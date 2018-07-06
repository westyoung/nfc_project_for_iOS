import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore'

/**
 * Generated class for the ItemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})

export class ItemDetailPage {
  showToolbar:boolean = false;
  transition:boolean = false;

  serialNum:any;
  model :string;
  location1: any;
  location2: any;
  quantity:any;
  id : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public ref: ChangeDetectorRef,public afs : AngularFirestore) {

      this.serialNum = this.navParams.get('serialNum');
      this.model = this.navParams.get('model');
      this.location1 = this.navParams.get('location1');
      this.location2 = this.navParams.get('location2');
      this.quantity = this.navParams.get('quantity');
      this.id=this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailPage');
  }

  onScroll($event: any){
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 100;
    if(scrollTop < 0){
        this.transition = false;
        //this.headerImgSize = `${ Math.abs(scrollTop)/2 + 100}%`;
    }else{
        this.transition = true;
       // this.headerImgSize = '100%'
    }
    this.ref.detectChanges();
  }

  modify(){

  }

  confirm(){
    this.afs.collection('item').doc(this.id).update({
      model : this.model,
      serialNum : this.serialNum,
      location1 : this.location1,
      location2 : this.location2,
      quantity : this.quantity,
      timestamp : new Date()
    })
    
      this.afs.collection("log").add({
        itemModel : this.model,
        itemSerialNum : this.serialNum,
        type : "modified",
        itemQuantity : this.quantity,
        itemLocation1 : this.location1, 
        itemLocation2 : this.location2,
        timestamp : new Date()
    })
    
    this.navCtrl.push('StockManagePage',{
      serialNum : this.serialNum,
      model : this.model,
      location1 : this.location1,
      location2 : this.location2,
      quantity : this.quantity, 
      id : this.id,
      status : true
    })
  }

}
