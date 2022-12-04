import { Directive, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective implements OnInit {
  @Input('appHideHeader') toolbar: any;
  private toolbarHeight: any
  constructor(private domCtrl: DomController,private renderer: Renderer2) { }

  ngOnInit(){
      this.toolbar = this.toolbar?.el;
      this.domCtrl.read(()=>{
        this.toolbarHeight = this.toolbar?.clientHeight;
      })
  }

  @HostListener('ionScroll',['$event']) onContentScroll($event){
    let scrollTop = $event.detail.scrollTop;
    let newPostion = -(scrollTop/5);
    if(newPostion< -this.toolbarHeight){
      newPostion = -this.toolbarHeight
    }
    if(scrollTop>30){
      this.domCtrl.write(()=>{
        this.renderer.setStyle(this.toolbar,'opacity', 0)
      })
    }
    else{
        this.domCtrl.write(()=>{
        this.renderer.setStyle(this.toolbar,'opacity', 1)
      })
    }
  }
}
