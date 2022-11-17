import { UserModel } from './user.model';

export type nString = string | undefined | null;
export interface CustomerModel {
  id?: nString;
  name: nString;
  website: nString;
  address: nString;
  users?: UserModel[];
}
