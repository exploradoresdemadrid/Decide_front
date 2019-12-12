import { NgModule, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/components/components.module';


@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, ComponentsModule],
  declarations: [],
  entryComponents:[],
  exports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    
  ],
  providers: [DatePipe],
})
export class SharedModule {}
