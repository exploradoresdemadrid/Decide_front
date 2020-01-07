import { BaseEntityService, EntityAPI, State } from './base-entity.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Entity } from './base-entity.model';

export class Group extends Entity {

  name: string;
  number: number;
  available_votes: number;

  getName() {
    return `${this.name}`;
  }
}

@Injectable({
  providedIn: 'root',
})
export class GroupService extends BaseEntityService<Group> {
  constructor(http: HttpClient) {
    super(Group, http);
  }

  getAPI(): EntityAPI {
    return {
      path: '/Group',
    };
  }
  getInitialState(): State<Group> {
    return {
      entities: [],
    };
  }
}
