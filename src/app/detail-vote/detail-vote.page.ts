
import { Component, OnInit } from '@angular/core';
import { OverlaysService } from 'src/shared/overlays';
import { VoteService, Vote } from 'src/entities/vote';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-detail-vote',
  templateUrl: './detail-vote.page.html',
  styleUrls: ['./detail-vote.page.scss'],
})
export class DetailVotePage implements OnInit {
id
vote$

vote  = 
  {
    name: 'Vote_1',
    uuid:1,
    numVotes: 1,
    numVotesOk:1,
    numVotesNull:0,
    numVotesAbst:0,
    numVotesKo:0
}



  constructor(
    private overlay: OverlaysService,
    private voteService : VoteService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.route.params.pipe(pluck('id')).subscribe(id => {
      this.id = id
    })
    //this.vote$ = this.voteService.selectById(this.id)
  }

}
