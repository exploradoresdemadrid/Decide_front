export abstract class Entity {
  id: string;

  constructor(data) {
    Object.assign(this, data);
  }

  static findById(entities, id) {
    return entities.find(entity => entity.id === id);
  }
}
