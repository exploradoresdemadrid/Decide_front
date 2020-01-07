import { BaseEntityService, EntityAPI, State } from './base-entity.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Entity } from './base-entity.model';

export class Vote extends Entity {

  title: string;
  description: string;
  status: string


  getName() {
    return `${this.title}`;
  }
}

@Injectable({
  providedIn: 'root',
})
export class VoteService extends BaseEntityService<Vote> {
  constructor(http: HttpClient) {
    super(Vote, http);
  }

  getAPI(): EntityAPI {
    return {
      path: 'votings',
    };
  }
  getInitialState(): State<Vote> {
    return {
      entities: [],
    };
  }

  selectVotingById(id :string){
    return this.selectById(id)
  }

  getVotes(){
    const request = this.getRequest(this.getAPI().path)
    request.subscribe(votes => this.dispatchSuccess({ entities: this.createList(votes) }));
    return request
  }

  getVotingById(id:string){
    const reuqets = this.getRequest(this.getAPI().path + '/' + id)
    reuqets.subscribe(voting => this.dispatchSuccess({
      entities: this.upsertList(voting)
    }))
    return reuqets
  }
  sendVoting(vote){
    const request = this.postRequest(this.getAPI().path +'/'+ vote.id+ '/vote', vote)
    return request

  }
}
