import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Vote, VoteService } from 'src/entities/vote';
import { OverlaysService } from 'src/shared/overlays';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


votes$
  constructor(
    private router :Router,
    private overlayService :OverlaysService,
    private votesService :VoteService
   ) {}

  ionViewWillEnter(){
    this.overlayService.requestWithLoaderAndError(()=>this.votesService.getVotes())
    this.votes$ = this.votesService.selectAll()
  }

  goToVotation(uuid){
    this.router.navigate(['/detail-vote', 1])
  }
}
