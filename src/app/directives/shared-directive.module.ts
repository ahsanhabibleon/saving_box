import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideHeaderDirective } from './hide-header.directive';
import { FadeHeaderDirective } from './fade-header.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [HideHeaderDirective, FadeHeaderDirective],
  exports: [HideHeaderDirective, FadeHeaderDirective]
})
export class SharedDirectiveModule {}
