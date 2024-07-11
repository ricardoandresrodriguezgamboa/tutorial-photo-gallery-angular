import { Component } from "@angular/core";
import { ActionSheetController, MenuController } from "@ionic/angular";


@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  constructor(public actionSheetController: ActionSheetController,private menu: MenuController) {}

  ionViewDidEnter() {
    const iframe = document.getElementById('ritmotoplatinovideo') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = 'https://www.topnewradio.cl/videos_app/ritmotoplatinovideo.html';
    }

    this.menuCtrl();

  }

  menuCtrl(){
    this.menu.close('menu1'); 
    this.menu.enable(false, 'menu1'); 

    this.menu.enable(true, 'menu2'); 
  }

  ionViewDidLeave(){
    const iframe = document.getElementById('ritmotoplatinovideo') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = '';
    }
  }


  
}


