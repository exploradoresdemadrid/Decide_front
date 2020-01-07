
import { Component, OnInit } from '@angular/core';
import { OverlaysService } from 'src/shared/overlays';
import { VoteService, Vote } from 'src/entities/vote';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-detail-vote',
  templateUrl: './detail-vote.page.html',
  styleUrls: ['./detail-vote.page.scss'],
})
export class DetailVotePage implements OnInit {
id
vote$
maxNumVotes = '10'
vote ={
  id: "1",
  title: "Presupuestos 2020",
  description: "Esta es la votacion de los presupuestos de 2020",
  status: "Abierta",
  questions:[ 
    {
      id: "2",
      title: "Propuesta de ASDE",
      description: "Implementacion del plan 666",
      type : "range",
      options: [
        {
          id: "3",
          title: "Se suben 0'50€"
        },
        {
          id: "4",
          title:"Se bajan 0,20€"
        },
        {
          id:"5",
          title:"Se queda tal cual"
        }
      ]
    },
    {
      id: "6",
      title: "Propuesta de ASDE",
      description: "Implementacion del plan 333",
      type : "range",
      options: [
        {
          id: "7",
          title: "Se suben 0'50€"
        },
        {
          id: "8",
          title:"Se bajan 0,20€"
        },
        {
          id:"9",
          title:"Se queda tal cual"
        }
      ]
    }
  ]
}

  constructor(
    private overlay: OverlaysService,
    private voteService : VoteService,
    private route: ActivatedRoute,
    private router :Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){    
  //   const user = JSON.parse(localStorage.getItem('groupDecide'));
  // this.maxNumVotes =  user.available_votes
  //   this.route.params.pipe(pluck('id')).subscribe(id  => {
  //     this.id = id
  //   this.overlay.requestWithLoaderAndError(()=> this.voteService.getVotingById(id))
  // })
    // this.vote$ = this.voteService.selectById(this.id)
    // this.vote$.subscribe((vote)=> vote.numVotes = this.maxNumVotes )   
  }

  hasOptionValue($event, option){ option.votes = $event  }

  senVoting(){
    if(!this.checkIsCorrectNumVotes()){
      this.overlay.presentError('Revisa tus votos, el numero de total de votos tiene que ser menor que el numero de votos que tienes asignados')
      return
    }

    // this.overlay.requestWithLoaderAndError(()=> this.voteService.sendVoting(this.vote)).subscribe(()=>{
    //   this.overlay.presentSuccess('Perfecto tu votacion ha sido enviada')
    // })
    this.overlay.presentSuccess('Perfecto tu votacion ha sido enviada')
    this.router.navigate(['/home'])
  }

  checkIsCorrectNumVotes(){
    let numTotal = 0
    let isValid = true
    this.vote.questions.forEach(question => {
      numTotal = 0

      question.options.forEach((vote:any) =>{
        if(vote.votes){
          numTotal = numTotal + parseFloat(vote.votes)
        }
      })

      if(numTotal > parseFloat(this.maxNumVotes)){
        isValid = false
      }

    })    
    return isValid
  }

}
