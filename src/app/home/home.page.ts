import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  list_votes =[
    {
        name: 'Vote_1',
        uuid:1,
        numVotes: 1,
        numVotesOk:1,
        numVotesKo:0
    },
    {
        name: 'Vote_2',
        uuid:2,
        numVotes: 10,
        numVotesOk:9,
        numVotesKo:1
    },    {
        name: 'Vote_3',
        uuid:3,
        numVotes: 5,
        numVotesOk:1,
        numVotesKo:4
    },    {
        name: 'Vote_4',
        uuid:4,
        numVotes: 8,
        numVotesOk:4,
        numVotesKo:4
    },   {
        name: 'Vote_5',
        uuid:5,
        numVotes: 3,
        numVotesOk:0,
        numVotesKo:0
    },
]

listVotes
  constructor(
    private router :Router
   ) {}

  ionViewWillEnter(){
    this.listVotes = this.list_votes
  }

  goToVotation(uuid){
    this.router.navigate(['/detail-vote', uuid])
  }
}
