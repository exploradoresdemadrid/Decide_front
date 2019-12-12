import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VotesInfoComponent } from './votes-info/votes-info.component';


@NgModule({
  declarations: [VotesInfoComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  exports: [
    CommonModule,
    VotesInfoComponent
  ],
  entryComponents: [],
})
export class ComponentsModule {}
