import { BaseEntityService, EntityAPI, State } from './base-entity.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Entity } from './base-entity.model';

export class Vote extends Entity {
  name: string;
  id:number;
  numVotes:number;
  numVotesOk: number;
  numVotesKo:number;
  numVotesNull:number;
  numVotesAbst:number;
  status:string;
  description:string;


  getName() {
    return `${this.name}`;
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
      path: '/Vote',
    };
  }
  getInitialState(): State<Vote> {
    return {
      entities: [],
    };
  }
}
