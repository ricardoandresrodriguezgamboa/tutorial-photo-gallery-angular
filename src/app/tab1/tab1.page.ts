import { Component } from "@angular/core";
import { ActionSheetController, MenuController } from "@ionic/angular";
import Hls from 'hls.js';
@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {

  private hls: Hls | null = null;
  private videoElement: HTMLVideoElement | null = null;

  constructor(public actionSheetController: ActionSheetController,private menu: MenuController) {}

  ionViewDidEnter() {
    this.loadVideo();

    this.menuCtrl();
 
  

  }

  menuCtrl(){
    this.menu.close('menu2'); 
    this.menu.enable(false, 'menu2'); 

    this.menu.enable(true, 'menu1'); 

  }

  ionViewDidLeave(){
    this.cleanupHls();
  }
 
  loadVideo() {
    const video = document.getElementById('topnewradiovideo') as HTMLVideoElement;
    const videoSrc = 'https://panel.tvstream.cl:1936/8052/8052/playlist.m3u8';

    if (Hls.isSupported()) {
      this.hls = new Hls({
        liveDurationInfinity: true,
        enableWorker: true,
        lowLatencyMode: true,
      });
      this.hls.loadSource(videoSrc);
      this.hls.attachMedia(video);
      this.hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
      });
      this.hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          switch(data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              // try to recover network error
              console.error('fatal network error encountered, try to recover');
              this.hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error('fatal media error encountered, try to recover');
              this.hls.recoverMediaError();
              break;
            default:
              // cannot recover
              this.hls.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', function () {
        video.play();
      });
    }
  }
 

  cleanupHls() {
    if (this.hls) {
      this.hls.destroy();
      this.hls = null;
    }
    if (this.videoElement) {
      this.videoElement.pause();
      this.videoElement.src = '';
    }
  }

  
}


