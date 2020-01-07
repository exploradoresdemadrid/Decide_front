import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VotesInfoComponent } from './votes-info/votes-info.component';
import { RangeSelectionComponent } from './range-selection/range-selection.component';


@NgModule({
  declarations: [VotesInfoComponent, RangeSelectionComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  exports: [
    CommonModule,
    VotesInfoComponent,
    RangeSelectionComponent
  ],
  entryComponents: [],
})
export class ComponentsModule {}
