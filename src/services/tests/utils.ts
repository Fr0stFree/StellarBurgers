import {v4 as uuid4} from 'uuid';
import {type IOrder} from '../orders/types';

export const generateOrder = (): IOrder => ({
  _id: Math.random().toString(),
  status: Math.random() > 0.5 ? 'done' : 'pending',
  name: `Order ${Math.floor(Math.random() * 100)}`,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  number: Math.floor(Math.random() * 100),
  ingredients: [uuid4(), uuid4(), uuid4()],
});
