import {Entity, model, property, hasMany} from '@loopback/repository';
import {User, UserWithRelations} from './user.model';

@model({name: 'customer', settings: {strict: true}})
export class Customer extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  website: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @hasMany(() => User)
  users: User[];

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
  user?: UserWithRelations[];
}

export type CustomerWithRelations = Customer & CustomerRelations;
