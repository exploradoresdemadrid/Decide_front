import { HttpClient } from '@angular/common/http';

// Rxjs
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck, map, filter, shareReplay } from 'rxjs/operators';

// Entities
import { Entity } from './base-entity.model';

export interface State<T extends Entity> {
  entities: T[];
}

export interface EntityAPI {
  path: string;
}

export abstract class BaseEntityService<T extends Entity> {
  private api: EntityAPI;
  private type: new (data) => T;
  private _http: HttpClient;

  protected subject$ = new BehaviorSubject<State<T>>(this.getInitialState());

  protected abstract getAPI(): EntityAPI;
  protected abstract getInitialState(): State<T>;

  protected state$: Observable<State<T>> = this.subject$.asObservable();
  protected entities$: Observable<T[]> = this.state$.pipe(pluck('entities'));

  constructor(type: new (data) => T, http: HttpClient) {
    this.api = this.getAPI();
    this.type = type;
    this._http = http;
  }

  get state() {
    return this.subject$.getValue();
  }

  public selectAll(): Observable<T[]> {
    return this.state$.pipe(
      pluck<State<T>, T[]>('entities'),
      filter(e => Boolean(e))
    );
  }

  public selectById(id): Observable<T> {
    return this.state$.pipe(
      pluck('entities'),
      map(entities => Entity.findById(entities, id)),
      filter(e => Boolean(e))
    );
  }

  public track(index, entity): number {
    return entity.id;
  }

  // GET

  public getAll(params = {}) {
    const request = this.getRequest(this.api.path, params);

    request.subscribe(
      entities => this.dispatchSuccess({ entities: this.createList(entities) }),
      error => this.dispatchSuccess({ entities: [] })
    );

    return request;
  }

  public getById(id) {
    const request = this.getRequest(`${this.api.path}/${id}`);

    request.subscribe(entity => {
      this.dispatchSuccess({ entities: this.upsert(this.createModel(entity)) });
    });

    return request;
  }

  public getPerPage(params, pagenum, event?) {
    const isFirstPage = params.page === 1;
    const request = this.getRequest(this.api.path, { ...params, pagenum });

    request.subscribe(
      entitiesPerPage => {
        if (event) event.complete();

        entitiesPerPage = this.createList(entitiesPerPage);
        const entities = isFirstPage ? entitiesPerPage : this.upsertList(entitiesPerPage);
        this.dispatchSuccess({ entities });
      },
      error => this.dispatchSuccess({ entities: [] })
    );

    return request;
  }

  // POST

  public create(newEntity: T, url) {
    const request = this.postRequest(this.api.path + url, newEntity);

    request.subscribe(entity => {
      this.dispatchSuccess({ entities: this.upsert(this.createModel(entity)) });
    });

    return request;
  }

  // PUT

  public update(updatedEntity: T) {
    const request = this.putRequest(`${this.api.path}/${updatedEntity.id}`, updatedEntity);

    request.subscribe(entity => {
      this.dispatchSuccess({ entities: this.upsert(this.createModel(entity)) });
    });

    return request;
  }

  // DELETE

  public delete(id) {
    const request = this.deleteRequest(`${this.api.path}/${id}`);

    request.subscribe(() => {
      this.dispatchSuccess({ entities: this.state.entities.filter(e => e.id != id) });
    });

    return request;
  }

  protected createModel(entity): T {
    return new this.type(entity);
  }

  protected createList(entities): T[] {
    return entities.map(entity => this.createModel(entity));
  }

  // Update one item in list
  protected upsert(entity) {
    const currentEntities = [...this.state.entities];
    const index = currentEntities.findIndex(e => e.id === entity.id);

    if (index > -1) {
      currentEntities[index] = entity;
    } else currentEntities.push(entity);

    return currentEntities;
  }

  // Update all items in list
  protected upsertList(entities) {
    const currentEntities = [...this.state.entities];
    entities.forEach(entity => {
      const index = currentEntities.findIndex(e => e.id === entity.id);

      if (index > -1) {
        currentEntities[index] = entity;
      } else currentEntities.push(entity);
    });

    return currentEntities;
  }

  protected getRequest(url: string, params = {}): Observable<T | T[]> {
    return this._http.get<T | T[]>(url, { params }).pipe(shareReplay());
  }

  protected postRequest(url: string, body = {}): Observable<T | T[]> {
    return this._http.post<T | T[]>(url, body).pipe(shareReplay());
  }

  protected putRequest(url: string, body = {}): Observable<{ success: boolean }> {
    return this._http.put<{ success: boolean }>(url, body).pipe(shareReplay());
  }

  protected deleteRequest(url: string): Observable<{ success: boolean }> {
    return this._http.delete<{ success: boolean }>(url).pipe(shareReplay());
  }

  protected dispatchSuccess(state = {}) {
    this.subject$.next({ ...this.state, ...state });
  }
}
