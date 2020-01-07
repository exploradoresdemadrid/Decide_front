import { Component, OnInit, Input, Output, EventEmitter,  } from '@angular/core';


@Component({
  selector: 'app-range-selection',
  templateUrl: './range-selection.component.html',
  styleUrls: ['./range-selection.component.scss'],
})
export class RangeSelectionComponent implements OnInit {
@Input() option : any
@Output() selectNumVotes :EventEmitter<string> = new EventEmitter<string>();

numVotes:number = 0
  constructor() { }

  ngOnInit() {
    this.option.numVotes = 10
  }

  getValueOption($event){
    this.numVotes = $event.target.value
    this.selectNumVotes.emit(this.numVotes.toString())
  }


}
