import { Component } from "@angular/core";
import { ActionSheetController, MenuController } from "@ionic/angular";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  constructor(public actionSheetController: ActionSheetController,private menu: MenuController) {}

  ionViewDidEnter() {
    const iframe = document.getElementById('topnewradiovideo') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = 'https://www.topnewradio.cl/videos_app/topnewradiovideo.html';
    }


    this.menuCtrl();
 
  

  }

  menuCtrl(){
    this.menu.close('menu2'); 
    this.menu.enable(false, 'menu2'); 

    this.menu.enable(true, 'menu1'); 

  }

  ionViewDidLeave(){
    const iframe = document.getElementById('topnewradiovideo') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = '';
    }
  }



  
}


