import { PropertyInsert } from './property-insert';

export interface Property extends Omit<PropertyInsert, 'townId'> {
  id: number;
  createdAt: string;
  status: string;

  town: {
    id: number;
    name: string;
    province: {
      id: number;
      name: string;
    };
  };
}

