import { Component, OnInit, Input } from '@angular/core';
import { Vote } from 'src/entities/vote';

@Component({
  selector: 'app-votes-info',
  templateUrl: './votes-info.component.html',
  styleUrls: ['./votes-info.component.scss'],
})
export class VotesInfoComponent implements OnInit {

  @Input() vote: Vote

  constructor() { }

  ngOnInit() {}

}
