import { Component, NgZone, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-listen-modal',
  templateUrl: './listen-modal.component.html',
  styleUrls: ['./listen-modal.component.scss'],
})
export class ListenModalComponent implements OnInit {
  searchItem: any='';
  constructor(private speechRecognition: SpeechRecognition, private ngZone: NgZone,private modal: ModalController) { }

  ngOnInit() {}
  startListen(){
    this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) => {
    if(!hasPermission){
      this.speechRecognition.requestPermission()
      .then(
          () => console.log('Granted'),
          () => console.log('Denied')
      );
    }else{
      const options = {
        showPopup: false,
      };
      this.speechRecognition.startListening(options)
      .subscribe(
        (matches: string[]) => {
          this.ngZone.run(()=>{
            this.searchItem = matches[0];
          });
        },
        (onerror) => {
        },
      );
      // this.isRecording=true;
    }
  });
  }
  stopListen(){
    this.speechRecognition.stopListening().then(()=>{
      this.modal.dismiss(this.searchItem);
    });
  }
}
