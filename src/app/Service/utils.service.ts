import { Injectable } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(
    public alertController: AlertController,
    public modal: ModalController,
    public actionSheetCtrl: ActionSheetController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  async presentAlert(header, title, message) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: title,
      message: message,
      mode: "ios",
      buttons: ["OK"],
    });
    await alert.present();
  }
  async presentToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: "bottom",
      color: color,
      cssClass:'toast'
    });
    toast.present();
  }

  async presentActionSheet(title: any, buttons: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      subHeader: title,
      buttons: buttons,
    });
    await actionSheet.present();
  }

  async addModal(compName, id, cssClass) {
    const modal = await this.modal.create({
      component: compName,
      cssClass: cssClass,
      id: id,
      backdropDismiss: false,
    });
    return await modal.present();
  }
  dismissModal(id: string) {
    this.modal.dismiss(null, null, id);
  }

 



 

 
  async presentLoading(msg: string, id: string) {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: msg,
      id: id,
    });
    await loading.present();
  }

  async dismissLoading(id) {
    await this.loadingController.dismiss(null, null, id);
  }
  // saveData(key,data){
  //   this.storage.setObject(key,data);
  // }

  // getData(key){
  //   return this.storage.getObject(key);

  // }
}
